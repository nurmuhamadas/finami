import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { Alert } from 'flowbite-react'

import useGetUserById from 'data/api/Users/useGetUserById'
import putUserMutation from 'data/mutations/users/putUserMutation'
import { type UpdateUserPayload } from 'data/types'

import AppLayout from 'components/AppLayout'
import FormInput from 'components/Forms/FormInput'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import ProfileAvatar from 'components/ProfileAvatar'
import { useAuth } from 'contexts/AuthContext'

import { updateProfileSchema } from './schema'

const AccountProfilePage = () => {
  const router = useRouter()
  const { user, setUser } = useAuth()

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPayload>({
    resolver: yupResolver(updateProfileSchema),
  })
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [isSuccess, setIsSuccess] = useState(false)

  const userMutation = putUserMutation()

  const { data, refetch } = useGetUserById(user?.id, { enabled: !!user })

  const handleChange = (key: keyof UpdateUserPayload, val: string) => {
    setErrorMessage(undefined)
    setIsSuccess(false)
    setValue(key, val)
  }

  const handleRegister = async (values: UpdateUserPayload) => {
    try {
      setIsSuccess(false)
      setErrorMessage(undefined)

      await userMutation.mutateAsync({
        id: user?.id,
        payload: {
          ...values,
        },
      })
      setUser({ ...user, ...values })
      await refetch()

      setIsSuccess(true)
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  const handleUpload = () => {
    setErrorMessage(undefined)
    setValue('image_url', 'https://i.ibb.co/rdqT4BG/food.pngg')
  }

  useEffect(() => {
    if (data) {
      setValue('username', data.username)
      setValue('fullname', data.fullname)
      setValue('email', data.email)
      setValue('image_url', data.image_url || undefined)
    }
  }, [data])

  return (
    <AppLayout>
      <div className="flex flex-col space-y-8 max-w-3xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MyButton
              color="light"
              onClick={() => {
                router.back()
              }}
            >
              <AiOutlineArrowLeft />
            </MyButton>
          </div>
        </div>

        <OverviewCard cardClassName="py-6">
          <div className="flex flex-col gap-4 items-center sm:items-start w-full mx-auto sm:flex-row">
            <div className="w-full sm:w-1/3">
              <ProfileAvatar
                showButton
                showDelete
                onDelete={() => {
                  setValue('image_url', undefined)
                }}
                onButtonClick={handleUpload}
                data={{
                  name: getValues('fullname'),
                  src: getValues('image_url'),
                }}
              />
            </div>

            <form
              className="flex flex-col gap-y-3 w-full sm:w-2/3"
              onSubmit={handleSubmit(handleRegister)}
            >
              <Alert
                color="failure"
                className={cn({ hidden: !errorMessage })}
                onDismiss={() => {
                  setErrorMessage(undefined)
                }}
              >
                {errorMessage}
              </Alert>
              <Alert
                color="success"
                className={cn({ hidden: !isSuccess })}
                onDismiss={() => {
                  setIsSuccess(false)
                }}
              >
                Success Update Data!
              </Alert>

              <FormInput
                label="Username"
                id="user_name"
                type="text"
                placeholder="Input"
                className="finamiInput"
                disabled
                defaultValue={data?.username}
                {...register('username')}
                errorMessage={errors.username?.message}
              />
              <FormInput
                label="Email"
                id="email"
                type="email"
                placeholder="example@mail.com"
                className="finamiInput"
                disabled
                defaultValue={data?.email}
                {...register('email')}
                errorMessage={errors.email?.message}
              />
              <FormInput
                label="Name"
                id="name"
                type="text"
                placeholder="Input"
                className="finamiInput"
                required
                defaultValue={data?.fullname}
                {...register('fullname')}
                onChange={(e) => {
                  handleChange('fullname', e.target?.value)
                  setErrorMessage(undefined)
                }}
                errorMessage={errors.fullname?.message}
              />
              <div className="w-full flex flex-wrap gap-1 mt-4">
                <MyButton
                  type="submit"
                  colorType="primary"
                  className="w-full max-w-[125px] mx-auto"
                  loading={userMutation.isLoading}
                >
                  Save
                </MyButton>
              </div>
            </form>
          </div>
        </OverviewCard>
      </div>
    </AppLayout>
  )
}

export default AccountProfilePage
