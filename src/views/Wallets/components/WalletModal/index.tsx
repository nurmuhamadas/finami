import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-tailwindcss-select'

import { yupResolver } from '@hookform/resolvers/yup'
import { Label, Modal, TextInput } from 'flowbite-react'

import MyButton from 'components/MyButton'
import MyModal from 'components/MyModal'

import { registerWalletSchema } from './schema'
import { type WalletDataType, type WalletModalProps } from './types'

const WalletModal = ({
  isOpen,
  initialData,
  onClose,
  onSave,
}: WalletModalProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletDataType>({
    resolver: yupResolver(registerWalletSchema),
    defaultValues: {
      name: initialData?.name || null,
      balance: 0,
      user_id: initialData?.user_id || null,
    },
  })
  const [selectedUserId, setSelectedUserId] = useState(undefined)

  const isNew = !initialData

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name)
      setValue('balance', initialData.balance)
      setValue('user_id', initialData.user_id)
      // TODO: setSelectedUserId()
    }
  }, [initialData])

  return (
    <MyModal show={isOpen} onClose={onClose} className="h-screen">
      <Modal.Header>{isNew ? 'Add New' : 'Edit'} Wallet</Modal.Header>
      <Modal.Body>
        <form
          className="space-y-6"
          onSubmit={handleSubmit((data) => {
            onSave(data)
          })}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Wallet name" />
            </div>
            <TextInput
              id="name"
              placeholder="Your name ..."
              required={true}
              {...register('name')}
              defaultValue={initialData?.name || null}
            />
            <p className="text-finamiRed">{errors.name?.message}</p>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="balance" value="Wallet balance" />
            </div>
            <TextInput
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
            />
            <p className="text-finamiRed">{errors.balance?.message}</p>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="user_id" value="Wallet owner" />
            </div>
            <Select
              isSearchable
              isClearable
              primaryColor="violet"
              value={selectedUserId}
              onChange={(e: any) => {
                if (e) {
                  setValue('user_id', e.value)
                  setSelectedUserId(e)
                } else {
                  setValue('user_id', '')
                  setSelectedUserId(undefined)
                }
              }}
              options={[
                { value: 'fox-1234561234567890', label: '🦊 Fox' },
                { value: 'Butterfly', label: '🦋 Butterfly' },
                { value: 'Honeybee', label: '🐝 Honeybee' },
              ]}
            />
            <p className="text-finamiRed">{errors.user_id?.message}</p>
          </div>
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
