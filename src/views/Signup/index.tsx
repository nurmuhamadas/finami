import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillCheckCircle } from 'react-icons/ai'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { Alert, Label } from 'flowbite-react'

import postUserMutation from 'data/mutations/users/postUserMutation'

import FormInput from 'components/Forms/FormInput'
import MyButton from 'components/MyButton'
import { useAuth } from 'contexts/AuthContext'
import { PAGES_URL } from 'utils/constants/pages'

import { signupSchema } from './schema'
import { type SignupDataTypes } from './types'

const SignupPage = () => {
  const router = useRouter()
  const { user } = useAuth()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupDataTypes>({
    resolver: yupResolver(signupSchema),
  })
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const postMutation = postUserMutation()

  const handleChange = (key: keyof SignupDataTypes, value: string) => {
    setError(null)
    if (value) {
      setValue(key, value)
    } else {
      setValue(key, undefined)
    }
  }

  const handleSignup = async (values: SignupDataTypes) => {
    try {
      setError(null)
      setIsLoading(true)

      await postMutation.mutateAsync({
        username: values.username,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        image_url: undefined,
        parent_id: undefined,
      })

      setIsSuccess(true)
      await router.push(PAGES_URL.login.url)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  if (user) {
    return <div></div>
  }

  return (
    <div className="w-full grid gap-y-8 md:grid-cols-2 content-center">
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
      <div className="px-6 py-12 md:py-20 md:h-screen overflow-y-auto">
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
              Join us and Stay in Control of Your Family&apos;s Finances
            </p>
          </div>
          <form
            className="flex flex-col gap-4 mt-8"
            onSubmit={handleSubmit(handleSignup)}
          >
            <Alert
              color="failure"
              className={cn('text-sm mt-1 whitespace-pre', {
                hidden: !error,
              })}
            >
              {error}
            </Alert>
            <Alert
              color="success"
              className={cn('text-sm mt-1', { hidden: !isSuccess })}
              icon={AiFillCheckCircle}
            >
              Create account successfully!
            </Alert>
            <FormInput
              id="username"
              label="Username"
              placeholder="Input..."
              disabled={isLoading}
              {...register('username')}
              onChange={(e) => {
                handleChange('username', e.target?.value)
              }}
              errorMessage={errors.username?.message}
            />
            <FormInput
              id="fullname"
              label="Full Name"
              placeholder="Input..."
              disabled={isLoading}
              {...register('fullname')}
              onChange={(e) => {
                handleChange('fullname', e.target?.value)
              }}
              errorMessage={errors.fullname?.message}
            />
            <FormInput
              id="email"
              label="Email"
              placeholder="example@mail.com"
              type="email"
              disabled={isLoading}
              {...register('email')}
              onChange={(e) => {
                handleChange('email', e.target?.value)
              }}
              errorMessage={errors.email?.message}
            />
            <FormInput
              id="password"
              label="Password"
              type={isShowPassword ? 'text' : 'password'}
              placeholder="Input..."
              disabled={isLoading}
              {...register('password')}
              onChange={(e) => {
                handleChange('password', e.target?.value)
              }}
              errorMessage={errors.password?.message}
            />
            <FormInput
              id="confirm_password"
              label="Password Confirmation"
              type={isShowPassword ? 'text' : 'password'}
              placeholder="Input..."
              disabled={isLoading}
              {...register('confirm_password')}
              onChange={(e) => {
                handleChange('confirm_password', e.target?.value)
              }}
              errorMessage={errors.confirm_password?.message}
            />
            <div className="flex items-center gap-2">
              <FormInput
                id="showPassword"
                type="checkbox"
                className="w-2 h-2 -mt-2"
                wrapperClassName="!w-2 h-2"
                disabled={isLoading}
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
                disabled={isLoading}
              >
                Sign Up
              </MyButton>
            </div>
          </form>
          <p className="mt-8 text-center">
            Already have an account?{' '}
            <Link href={PAGES_URL.signup.url} className="text-finamiBlue ml-2">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
