import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import { yupResolver } from '@hookform/resolvers/yup'
import { Modal } from 'flowbite-react'

import useGetUsers from 'data/api/Users/useGetUsers'

import FormInput from 'components/Forms/FormInput'
import FormSelect from 'components/Forms/FormSelect'
import MyButton from 'components/MyButton'
import MyModal from 'components/MyModal'
import { mapDataToSelectOptions } from 'utils/helpers/helper'

import { registerWalletSchema } from './schema'
import { type WalletFormData, type WalletModalProps } from './types'

const WalletModal = ({
  isOpen,
  initialData,
  onClose,
  onSave,
  isEditData,
}: WalletModalProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WalletFormData>({
    resolver: yupResolver(registerWalletSchema),
    defaultValues: {
      name: initialData?.name || null,
      balance: 0,
      user_id: initialData?.user_id || null,
    },
  })
  const [selectedUserId, setSelectedUserId] = useState(undefined)

  const isNew = !initialData?.name

  const users = useGetUsers()
  const userOpt = mapDataToSelectOptions(users, 'id', 'fullname')

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name)
      setValue('balance', initialData.balance)
      setValue('user_id', initialData.user_id)

      const _selecteduser = userOpt.find((d) => d.value === initialData.user_id)
      setSelectedUserId(_selecteduser)
    }
  }, [initialData])

  return (
    <MyModal
      show={isOpen}
      onClose={() => {
        onClose()
        reset()
        setSelectedUserId(undefined)
      }}
      className="h-screen"
    >
      <Modal.Header>{isNew ? 'Add New' : 'Edit'} Wallet</Modal.Header>
      <Modal.Body>
        <form
          className="space-y-6"
          onSubmit={handleSubmit((data) => {
            onSave(data)
          })}
        >
          <FormInput
            label="Wallet name"
            id="name"
            placeholder="Your name ..."
            required={true}
            {...register('name')}
            defaultValue={initialData?.name || null}
            errorMessage={errors.name?.message}
          />
          <FormInput
            label="Wallet balance"
            id="balance"
            placeholder="Your name ..."
            required={true}
            type="number"
            {...register('balance')}
            onChange={(e) => {
              if (e?.target?.value) {
                setValue('balance', Number(e.target.value))
              } else {
                setValue('balance', 0)
              }
            }}
            errorMessage={errors.balance?.message}
          />
          <FormSelect
            required
            label="Planning category"
            value={selectedUserId}
            onChange={(e: Option | Option[]) => {
              if (e) {
                setValue('user_id', (e as Option).value)
                setSelectedUserId(e)
              } else {
                setValue('user_id', '')
                setSelectedUserId(undefined)
              }
            }}
            options={userOpt}
            isDisabled={isEditData}
            errorMessage={errors.user_id?.message}
          />
          <div className="item-center flex justify-end">
            <MyButton colorType="primary" type="submit">
              Save
            </MyButton>
          </div>
        </form>
      </Modal.Body>
    </MyModal>
  )
}

export default WalletModal
