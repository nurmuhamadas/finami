import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'

import useGetUserById from 'data/api/Users/useGetUserById'
import { type UpdateUserPayload } from 'data/types'

import AppLayout from 'components/AppLayout'
import FormInput from 'components/Forms/FormInput'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import ProfileAvatar from 'components/ProfileAvatar'

import { updateProfileSchema } from './schema'

const ID = 'useruseruseruser-001'

const AccountProfilePage = () => {
  const router = useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPayload>({
    resolver: yupResolver(updateProfileSchema),
  })

  const data = useGetUserById({ id: ID })

  const handleRegister = (values: UpdateUserPayload) => {
    console.log(values)
  }

  const handleUpload = () => {
    setValue(
      'image_url',
      'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    )
  }

  useEffect(() => {
    if (data) {
      setValue('username', data.username)
      setValue('fullname', data.fullname)
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
                onButtonClick={handleUpload}
                buttonText="Change photo"
              />
            </div>

            <form
              className="flex flex-col gap-y-3 w-full sm:w-2/3"
              onSubmit={handleSubmit(handleRegister)}
            >
              <FormInput
                label="Username"
                id="user_name"
                type="text"
                placeholder="Input"
                className="finamiInput"
                required
                disabled
                {...register('username')}
                errorMessage={errors.username?.message}
              />
              <FormInput
                label="Name"
                id="name"
                type="text"
                placeholder="Input"
                className="finamiInput"
                required
                {...register('fullname')}
                errorMessage={errors.fullname?.message}
              />
              <div className="w-full flex flex-wrap gap-1 mt-4">
                <MyButton
                  type="submit"
                  colorType="primary"
                  className="w-full max-w-[125px] mx-auto"
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
