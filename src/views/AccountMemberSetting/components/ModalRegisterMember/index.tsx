import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Alert } from 'flowbite-react'

import { type CreateUserPayload } from 'data/types'

import FormInput from 'components/Forms/FormInput'
import MyButton from 'components/MyButton'
import MyModal from 'components/MyModal'

import { registerMemberSchema } from './schema'
import { type ModalRegisterMemberProps } from './types'

const ModalRegisterMember = ({
  initialData,
  show,
  disableForm,
  errorMessage,
  onValueChange,
  onClose,
  onSubmit,
}: ModalRegisterMemberProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserPayload>({
    resolver: yupResolver(registerMemberSchema),
  })

  const handeValuechange = (key: keyof CreateUserPayload, val: string) => {
    if (val) {
      setValue(key, val)
    } else {
      setValue(key, undefined)
    }
    onValueChange?.()
  }

  useEffect(() => {
    if (initialData) {
      // FORM VALUES
      setValue('username', initialData.username)
      setValue('email', initialData.email)
      setValue('password', initialData.password)
      setValue('fullname', initialData.fullname)
    }
  }, [initialData])

  return (
    <MyModal
      show={show}
      onClose={onClose}
      header={<h3>Register New Member</h3>}
    >
      {errorMessage && (
        <Alert color="failure" className="mb-4">
          {errorMessage}
        </Alert>
      )}

      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          label="Username"
          id="username"
          placeholder="Input"
          disabled={disableForm}
          className="focus:!ring-finamiBlue focus:!border-finamiBlue text-sm"
          {...register('username')}
          onChange={(e) => {
            handeValuechange('username', e?.target?.value)
          }}
          errorMessage={errors.username?.message}
        />
        <FormInput
          label="Email"
          id="email"
          placeholder="example@mail.com"
          disabled={disableForm}
          type="email"
          className="focus:!ring-finamiBlue focus:!border-finamiBlue text-sm"
          {...register('email')}
          onChange={(e) => {
            handeValuechange('email', e?.target?.value)
          }}
          errorMessage={errors.email?.message}
        />
        <FormInput
          label="Full Name"
          id="fullname"
          placeholder="Input"
          disabled={disableForm}
          className="focus:!ring-finamiBlue focus:!border-finamiBlue text-sm"
          {...register('fullname')}
          onChange={(e) => {
            handeValuechange('fullname', e?.target?.value)
          }}
          errorMessage={errors.fullname?.message}
        />
        <FormInput
          label="Password"
          id="password"
          placeholder="Input"
          disabled={disableForm}
          type="password"
          className="focus:!ring-finamiBlue focus:!border-finamiBlue text-sm"
          {...register('password')}
          onChange={(e) => {
            handeValuechange('password', e?.target?.value)
          }}
          errorMessage={errors.password?.message}
        />
        <div className="md:col-span-2">
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
    </MyModal>
  )
}

export default ModalRegisterMember
