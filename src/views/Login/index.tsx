import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillCheckCircle } from 'react-icons/ai'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { Alert, Label } from 'flowbite-react'

import FormInput from 'components/Forms/FormInput'
import MyButton from 'components/MyButton'
import { useAuth } from 'contexts/AuthContext'
import { dummyUsersData } from 'utils/constants/dummyData'
import { PAGES_URL } from 'utils/constants/pages'
import { saveAuthToLocal } from 'utils/helpers/helper'

import { loginSchema } from './schema'
import { type LoginDataTypes } from './types'

const LoginPage = () => {
  const router = useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataTypes>({
    resolver: yupResolver(loginSchema),
  })
  const { setUser } = useAuth()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      // DO API CALL HERE

      // Save Session
      const user = dummyUsersData[0]
      const _user = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        imageUrl: user.image_url,
      }

      saveAuthToLocal({
        accessToken: 'Access Token',
        refreshToken: 'Refresh Token',
        ..._user,
      })
      setUser(_user)
      setIsSuccess(true)

      await router.replace(PAGES_URL.overview.url)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full grid gap-y-8 md:grid-cols-2 content-center md:h-screen">
      <div className="h-full flex justify-center items-center">
        <div className="w-full relative flex justify-center items-center">
          <a
            className="absolute w-full h-full z-[2]"
            href="https://www.freepik.com/free-vector/hand-drawn-stock-market-concept-with-screen_20058506.htm#query=finance&position=3&from_view=search&track=sph"
          ></a>
          <Image
            src="/static/images/login.png"
            alt="Login to Finami"
            className="!w-3/4 !h-max !relative"
            priority
            fill
          />
        </div>
      </div>
      <div className="px-6 py-12">
        <div className="px-4 rounded-xl max-w-sm md:max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Image
                width={48}
                height={48}
                src="/static/favicon.ico"
                alt="Finami"
              />
              <span className="font-semibold text-2xl">Finami</span>
            </div>
            <p className="text-3xl font-bold text-finamiBlue text-center mt-4">
              Start manage your family financial
            </p>
          </div>
          <form
            className="flex flex-col gap-4 mt-8"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Alert
              color="failure"
              className={cn('text-sm mt-1', { hidden: !error })}
            >
              {error}
            </Alert>
            <Alert
              color="success"
              className={cn('text-sm mt-1', { hidden: !isSuccess })}
              icon={AiFillCheckCircle}
            >
              Login successfully!
            </Alert>
            <FormInput
              id="username"
              label="Username"
              placeholder="Input..."
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
              id="password"
              label="Password"
              type={isShowPassword ? 'text' : 'password'}
              placeholder="Input..."
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
            <div className="flex items-center gap-2">
              <FormInput
                id="showPassword"
                type="checkbox"
                className="w-2 h-2 -mt-2"
                wrapperClassName="!w-2 h-2"
                onChange={(e) => {
                  setIsShowPassword(e.target.checked)
                }}
              />
              <Label htmlFor="showPassword" className="ml-4">
                Show password
              </Label>
            </div>
            <div className="flex w-full mt-4">
              <MyButton
                type="submit"
                colorType="primary"
                className="w-full max-w-md"
                loading={isLoading}
              >
                Login
              </MyButton>
            </div>
          </form>
          <p className="mt-8 text-center">
            Don&apos;t have account yet?{' '}
            <Link href={PAGES_URL.signup.url} className="text-finamiBlue ml-2">
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
