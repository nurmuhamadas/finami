import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import { yupResolver } from '@hookform/resolvers/yup'
import { Alert } from 'flowbite-react'

import {
  type CategoryGroupsType,
  type CreateCategoryPayload,
  type UpdateCategoryPayload,
} from 'data/types'

import FormInput from 'components/Forms/FormInput'
import FormSelect from 'components/Forms/FormSelect'
import ImageUploader from 'components/ImageUploader'
import MyAvatar from 'components/MyAvatar'
import MyButton from 'components/MyButton'
import MyModal from 'components/MyModal'
import { CATEGORY_GROUP_OPT } from 'utils/constants/common'
import { getBEImageUrl } from 'utils/helpers/helper'

import { registerCategorySchema, updateCategorySchema } from './schema'
import { type ModalRegisterCategoryProps } from './types'

const ModalRegisterCategory = ({
  initialData,
  show,
  disableForm,
  loading = false,
  errorMessage,
  onClose,
  onSubmit,
}: ModalRegisterCategoryProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryPayload | UpdateCategoryPayload>({
    resolver: yupResolver(
      initialData?.icon_url ? updateCategorySchema : registerCategorySchema,
    ),
    shouldUnregister: false,
  })

  const [selectedOptions, setSelectedOptions] = useState({
    group: undefined,
  })
  const [tempImageUrl, setTempImageUrl] = useState(null)

  useEffect(() => {
    setTempImageUrl(null)
    if (initialData) {
      // FORM VALUES
      setValue('name', initialData.name)
      setValue('group', initialData.group)
      setValue('transaction_type', initialData.transaction_type)
      setValue('icon_url', initialData.icon_url || undefined)
      setValue('icon', undefined)

      // OPTIONS
      const group = CATEGORY_GROUP_OPT.find(
        (c) => c.value === initialData.group,
      )
      setSelectedOptions({ group })
    }
  }, [initialData])

  const handleUploadImage = (image: File) => {
    setValue('icon', image)
    const objectUrl = URL.createObjectURL(image)
    setTempImageUrl(objectUrl)
  }

  return (
    <MyModal
      show={show}
      onClose={() => {
        setSelectedOptions({ group: undefined })
        setValue('name', undefined)
        setValue('group', undefined)
        setValue('transaction_type', undefined)
        setValue('icon_url', undefined)
        setValue('icon', undefined)
        onClose()
      }}
      header={<h3>{initialData ? 'Edit ' : `Register New `} Category</h3>}
    >
      {errorMessage && (
        <Alert color="failure" className="mb-4">
          {errorMessage}
        </Alert>
      )}
      {show && (
        <form
          className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="Category Name"
            id="name"
            placeholder="Input"
            disabled={disableForm || loading}
            defaultValue={initialData?.name || null}
            {...register('name')}
            onChange={(e) => {
              if (e?.target?.value) {
                setValue('name', e.target.value)
              } else {
                setValue('name', undefined)
              }
            }}
            errorMessage={errors.name?.message}
          />
          <FormSelect
            label="Group"
            disabled={disableForm || loading}
            {...register('group')}
            value={selectedOptions.group}
            onChange={(e: Option | Option[]) => {
              if (e) {
                const v = (e as Option).value as CategoryGroupsType
                const _c = CATEGORY_GROUP_OPT.find((d) => d.value === v)
                setValue('transaction_type', _c?.type)
                setValue('group', v)
                setSelectedOptions({
                  group: e as Option,
                })
              } else {
                setValue('group', undefined)
                setValue('transaction_type', undefined)
                setSelectedOptions({
                  group: undefined,
                })
              }
            }}
            options={CATEGORY_GROUP_OPT}
            errorMessage={errors.group?.message}
          />
          <div className="sm:col-span-2">
            <div className="flex gap-2 items-center">
              <MyAvatar
                src={tempImageUrl || getBEImageUrl(initialData?.icon_url)}
                alt={initialData?.name || 'avatar'}
                size={64}
              />
              <ImageUploader
                onOk={handleUploadImage}
                showFileName
                adjusmentSetting={{
                  scale: 1,
                  radial: true,
                  fixScale: true,
                }}
                maxFileSize={2 * 1024 ** 2}
              />
            </div>
            {errors.icon && (
              <span className="text-red-500 text-sm">
                {errors.icon?.message}
              </span>
            )}
          </div>
          <div className="sm:col-span-2">
            <MyButton
              type="submit"
              colorType="primary"
              className="w-full max-w-[125px] mt-8 mx-auto"
              disabled={disableForm}
              loading={loading}
            >
              Save
            </MyButton>
          </div>
        </form>
      )}
    </MyModal>
  )
}

export default ModalRegisterCategory
