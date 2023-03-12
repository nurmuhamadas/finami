import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { Alert } from 'flowbite-react'

import FormInput from 'components/Forms/FormInput'
import MyButton from 'components/MyButton'
import MyModal from 'components/MyModal'

import { registerWalletSchema } from './schema'
import { type WalletFormData, type WalletModalProps } from './types'

const WalletModal = ({
  isOpen,
  initialData,
  errorMessage,
  isSubmitting,
  onFormChange,
  onClose,
  onSave,
}: WalletModalProps) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WalletFormData>({
    resolver: yupResolver(registerWalletSchema),
    defaultValues: {
      name: initialData?.name || null,
      balance: 0,
    },
  })

  const isNew = !initialData?.name

  const handleInputChange = (
    key: keyof WalletFormData,
    val: string | number,
  ) => {
    onFormChange?.()
    setValue(key, val || undefined)
  }

  useEffect(() => {
    if (initialData) {
      if (!getValues('name')) setValue('name', initialData.name)
      if (!getValues('balance')) setValue('balance', initialData.balance)
    }
  }, [initialData])

  return (
    <MyModal
      show={isOpen}
      onClose={() => {
        onClose()
        reset()
      }}
      className="h-screen"
      header={`${isNew ? 'Add New' : 'Edit'} Wallet`}
    >
      <Alert color="failure" className={cn('mb-4', { hidden: !errorMessage })}>
        {errorMessage}
      </Alert>

      {isOpen && (
        <form
          className="space-y-6"
          onSubmit={handleSubmit((data) => {
            onSave(data)
          })}
        >
          <FormInput
            label="Wallet name"
            id="name"
            required={true}
            {...register('name')}
            onChange={(e) => {
              handleInputChange('name', e.target?.value)
            }}
            defaultValue={initialData?.name || null}
            errorMessage={errors.name?.message}
          />
          <FormInput
            label="Wallet balance"
            id="balance"
            required={true}
            type="number"
            defaultValue={initialData?.balance || null}
            {...register('balance')}
            onChange={(e) => {
              handleInputChange('balance', e.target?.value)
            }}
            errorMessage={errors.balance?.message}
          />
          <div className="item-center flex justify-end">
            <MyButton
              colorType="primary"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="mx-auto w-64 mt-4"
            >
              Save
            </MyButton>
          </div>
        </form>
      )}
    </MyModal>
  )
}

export default WalletModal
