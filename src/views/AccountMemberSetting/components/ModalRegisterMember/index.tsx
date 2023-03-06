import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { type CreateUserPayload } from 'data/types'

import FormInput from 'components/Forms/FormInput'
import MyButton from 'components/MyButton'
import MyModal from 'components/MyModal'

import { registerMemberSchema } from './schema'
import { type ModalRegisterMemberProps } from './types'

const ModalRegisterMember = ({
  initialData,
  show,
  onClose,
  disableForm,
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

  useEffect(() => {
    if (initialData) {
      // FORM VALUES
      setValue('username', initialData.username)
      setValue('email', initialData.email)
      setValue('password', initialData.password)
      setValue('fullname', initialData.fullname)
      setValue('parent_id', initialData.parent_id)
    }
  }, [initialData])

  return (
    <MyModal
      show={show}
      onClose={onClose}
      header={<h3>Register New Member</h3>}
    >
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
            if (e?.target?.value) {
              setValue('username', e.target.value)
            } else {
              setValue('username', undefined)
            }
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
            if (e?.target?.value) {
              setValue('email', e.target.value)
            } else {
              setValue('email', undefined)
            }
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
            if (e?.target?.value) {
              setValue('fullname', e.target.value)
            } else {
              setValue('fullname', undefined)
            }
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
            if (e?.target?.value) {
              setValue('password', e.target.value)
            } else {
              setValue('password', undefined)
            }
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
