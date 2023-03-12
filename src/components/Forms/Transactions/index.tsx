import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import { yupResolver } from '@hookform/resolvers/yup'
import { Label, Textarea } from 'flowbite-react'

import useGetCategories from 'data/api/Categories/useGetCategories'
import useGetWallets from 'data/api/Wallets/useGetWallets'
import { type CreateTransactionPayload } from 'data/types'

import MyButton from 'components/MyButton'
import MyDatePicker from 'components/MyDatePicker'
import { useAuth } from 'contexts/AuthContext'
import { mapDataToSelectOptions } from 'utils/helpers/helper'

import FormInput from '../FormInput'
import FormSelect from '../FormSelect'

import { registerTransactionSchema } from './schema'
import { type TransactionFormProps } from './types'

const TransactionForm = ({
  initialData,
  disableForm,
  isLoading,
  onValueChange,
  onSubmit,
}: TransactionFormProps) => {
  const { user } = useAuth()
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTransactionPayload>({
    resolver: yupResolver(registerTransactionSchema),
  })

  // * Only include child if edit data and not owner
  const includeChild = !!initialData?.category_id && !initialData?.is_owner

  // OPTIONS
  const { data: wallets, isLoading: isWalletLoading } = useGetWallets({
    user_id: !includeChild ? user?.id : undefined,
  })
  const optWallets = mapDataToSelectOptions(wallets, 'id', 'name')
  const { data: categories, isLoading: isCategoryLoading } = useGetCategories({
    user_id: !includeChild ? user?.id : undefined,
  })
  const optCategories = mapDataToSelectOptions(categories, 'id', 'name')

  const [optionsValue, setOptionsValue] = useState({
    wallet_id: undefined,
    category_id: undefined,
  })

  const handleOptionChange = (
    v: Option,
    name: keyof CreateTransactionPayload,
  ) => {
    if (v) {
      setValue(name, v.value)
      setOptionsValue((o) => ({
        ...o,
        [name]: v,
      }))
    } else {
      setValue(name, undefined)
      setOptionsValue((o) => ({
        ...o,
        [name]: undefined,
      }))
    }

    onValueChange?.()
  }

  const handleInputChange = (
    key: keyof CreateTransactionPayload,
    v: string | number,
  ) => {
    if (v) {
      if (key === 'amount') {
        setValue(key, Number(v))
      }
      setValue(key, v)
    } else {
      setValue(key, 0)
    }
    onValueChange?.()
  }

  useEffect(() => {
    if (initialData && !isCategoryLoading && !isWalletLoading) {
      // FORM VALUES
      if (!getValues('wallet_id')) setValue('wallet_id', initialData.wallet_id)
      if (!getValues('amount')) setValue('amount', initialData.amount)
      if (!getValues('date')) setValue('date', initialData.date)
      if (!getValues('image_url')) setValue('image_url', initialData.image_url)
      if (!getValues('description'))
        setValue('description', initialData.description)
      if (!getValues('category_id')) {
        setValue('category_id', initialData.category_id)
        setValue(
          'transaction_type',
          categories?.find((c) => c.id === initialData?.category_id)
            ?.transaction_type,
        )
      }

      // OPTIONS VALUES
      const _wallet = optWallets.find(
        (d) => d.value === (getValues('wallet_id') || initialData.wallet_id),
      )
      const _category = optCategories.find(
        (d) =>
          d.value === (getValues('category_id') || initialData.category_id),
      )
      setOptionsValue({
        wallet_id: _wallet,
        category_id: _category,
      })
    }
  }, [initialData, isWalletLoading, isCategoryLoading])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 md:grid-cols-2"
    >
      <FormSelect
        required
        label="Wallet"
        isDisabled={disableForm}
        placeholder="Select wallet..."
        value={optionsValue.wallet_id}
        onChange={(e: Option | Option[]) => {
          handleOptionChange(e as Option, 'wallet_id')
        }}
        options={optWallets}
        errorMessage={errors.wallet_id?.message}
      />
      <FormInput
        id="amount"
        label="Transaction amount"
        required
        placeholder="Input amount..."
        className="finamiInput"
        type="number"
        disabled={disableForm}
        defaultValue={initialData?.amount || null}
        {...register('amount')}
        onChange={(e) => {
          handleInputChange('amount', e.target?.value)
        }}
        errorMessage={errors.amount?.message}
      />
      <FormSelect
        required
        isSearchable
        label="Transaction category"
        isDisabled={disableForm}
        placeholder="Select category..."
        value={optionsValue.category_id}
        onChange={(e: Option | Option[]) => {
          const v = e as Option
          handleOptionChange(v, 'category_id')
          setValue(
            'transaction_type',
            categories?.find((c) => c.id === v.value)?.transaction_type,
          )
        }}
        options={optCategories}
        errorMessage={errors.category_id?.message}
      />
      <div>
        <div className="mb-2 block">
          <Label htmlFor="date" value="Transaction date" />
          <span className="text-red-500">*</span>
        </div>
        <MyDatePicker
          disabled={disableForm}
          initialValue={{
            startDate: initialData?.date || new Date(),
            endDate: initialData?.date || new Date(),
          }}
          onChange={(v) => {
            onValueChange?.()
            setValue('date', v as Date)
          }}
        />
        <p className="text-finamiRed text-sm mt-1">{errors.date?.message}</p>
      </div>
      <div className="md:col-span-2">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Transaction description" />
          <span className="text-red-500">*</span>
        </div>
        <Textarea
          id="description"
          placeholder="Leave a description..."
          rows={4}
          disabled={disableForm}
          className="focus:!ring-finamiBlue focus:!border-finamiBlue text-sm"
          {...register('description')}
          onChange={(e) => {
            handleInputChange('description', e.target?.value)
          }}
        />
        <p className="text-finamiRed text-sm mt-1">
          {errors.description?.message}
        </p>
      </div>
      <div className="md:col-span-2 flex w-full justify-center">
        <MyButton
          type="submit"
          colorType="primary"
          className="w-full max-w-md"
          disabled={disableForm || isLoading}
          loading={isLoading}
        >
          Save
        </MyButton>
      </div>
    </form>
  )
}

export default TransactionForm
