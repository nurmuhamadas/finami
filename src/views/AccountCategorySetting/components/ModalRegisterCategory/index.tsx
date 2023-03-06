import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import { yupResolver } from '@hookform/resolvers/yup'

import { type CategoryGroupsType, type CreateCategoryPayload } from 'data/types'

import FormInput from 'components/Forms/FormInput'
import FormSelect from 'components/Forms/FormSelect'
import MyAvatar from 'components/MyAvatar'
import MyButton from 'components/MyButton'
import MyModal from 'components/MyModal'
import { CATEGORY_GROUP_OPT } from 'utils/constants/common'

import { registerCategorySchema } from './schema'
import { type ModalRegisterCategoryProps } from './types'

const ModalRegisterCategory = ({
  initialData,
  show,
  onClose,
  disableForm,
  onSubmit,
}: ModalRegisterCategoryProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryPayload>({
    resolver: yupResolver(registerCategorySchema),
  })

  const [selectedOptions, setSelectedOptions] = useState({
    group: undefined,
  })

  useEffect(() => {
    if (initialData) {
      // FORM VALUES
      setValue('name', initialData.name)
      setValue('group', initialData.group)
      setValue('transaction_type', initialData.transaction_type)
      setValue('icon_url', initialData.icon_url)

      // OPTIONS
      const group = CATEGORY_GROUP_OPT.find(
        (c) => c.value === initialData.group,
      )
      setSelectedOptions({ group })
    }
  }, [initialData])

  return (
    <MyModal
      show={show}
      onClose={() => {
        setSelectedOptions({ group: undefined })
        setValue('name', undefined)
        setValue('group', undefined)
        setValue('transaction_type', undefined)
        setValue('icon_url', undefined)
        onClose()
      }}
      header={<h3>{initialData ? 'Edit ' : `Register New `} Category</h3>}
    >
      {show && (
        <form
          className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label="Category Name"
            id="name"
            placeholder="Input"
            disabled={disableForm}
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
            disabled={disableForm}
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
          <div className="sm:col-span-2 flex gap-2 items-center">
            <MyAvatar
              src={initialData?.icon_url || '/static/images/default_pp.png'}
              alt={initialData?.name || 'avatar'}
              size={64}
            />
            <MyButton color="light" className="" disabled={disableForm}>
              Upload
            </MyButton>
          </div>
          <div className="sm:col-span-2">
            <MyButton
              type="submit"
              colorType="primary"
              className="w-full max-w-[125px] mt-8 mx-auto"
              disabled={disableForm}
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
