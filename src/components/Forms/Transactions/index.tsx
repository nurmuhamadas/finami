import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-tailwindcss-select'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import { yupResolver } from '@hookform/resolvers/yup'
import { Label, Textarea, TextInput } from 'flowbite-react'

import useGetCategories from 'data/api/Categories/useGetCategories'
import useGetWallets from 'data/api/Wallets/useGetWallets'
import { type CreateTransactionPayload } from 'data/types'

import MyButton from 'components/MyButton'
import MyDatePicker from 'components/MyDatePicker'
import { mapDataToSelectOptions } from 'utils/helpers/helper'

import { registerTransactionSchema } from './schema'
import { type TransactionFormProps } from './types'

const TransactionForm = ({
  initialData,
  disableForm,
  onSubmit,
}: TransactionFormProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTransactionPayload>({
    resolver: yupResolver(registerTransactionSchema),
  })

  // OPTIONS
  const wallets = useGetWallets()
  const optWallets = mapDataToSelectOptions(wallets, 'id', 'name')
  const categories = useGetCategories()
  const optcategories = mapDataToSelectOptions(categories, 'id', 'name')

  const [optionsValue, setOptionsValue] = useState({
    wallet_id: undefined,
    category_id: undefined,
  })

  const handleOptionChange = (v: Option, name: string) => {
    setOptionsValue((o) => ({
      ...o,
      [name]: v,
    }))
  }

  useEffect(() => {
    if (initialData) {
      // FORM VALUES
      setValue('wallet_id', initialData.wallet_id)
      setValue('amount', initialData.amount)
      setValue('category_id', initialData.category_id)
      setValue('date', initialData.date)
      setValue('description', initialData.description)

      // OPTIONS VALUES
      const _wallet = optWallets.find((d) => d.value === initialData.wallet_id)
      const _category = optcategories.find(
        (d) => d.value === initialData.category_id,
      )
      setOptionsValue({
        wallet_id: _wallet,
        category_id: _category,
      })
    }
  }, [initialData])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 md:grid-cols-2"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="wallet_id" value="Wallet" />
        </div>
        <Select
          isSearchable
          isClearable
          isDisabled={disableForm}
          primaryColor="violet"
          placeholder="Select wallet..."
          value={optionsValue.wallet_id}
          onChange={(e: Option | Option[]) => {
            if (e) {
              setValue('wallet_id', (e as Option).value)
              handleOptionChange(e as Option, 'wallet_id')
            } else {
              setValue('wallet_id', undefined)
              handleOptionChange(undefined, 'wallet_id')
            }
          }}
          options={optWallets}
        />
        <p className="text-finamiRed text-sm mt-1">
          {errors.wallet_id?.message}
        </p>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="amount" value="Transaction amount" />
        </div>
        <TextInput
          id="amount"
          placeholder="Input amount..."
          required={true}
          className="finamiInput"
          type="number"
          disabled={disableForm}
          {...register('amount')}
          onChange={(e) => {
            if (e?.target?.value) {
              setValue('amount', Number(e.target.value))
            } else {
              setValue('amount', 0)
            }
          }}
        />
        <p className="text-finamiRed text-sm mt-1">{errors.amount?.message}</p>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category_id" value="Transaction category" />
        </div>
        <Select
          isSearchable
          isClearable
          isDisabled={disableForm}
          primaryColor="violet"
          placeholder="Select category..."
          value={optionsValue.category_id}
          onChange={(e: Option | Option[]) => {
            if (e) {
              setValue('category_id', (e as Option).value)
              handleOptionChange(e as Option, 'category_id')
            } else {
              setValue('category_id', undefined)
              handleOptionChange(undefined, 'category_id')
            }
          }}
          options={optcategories}
        />
        <p className="text-finamiRed text-sm mt-1">
          {errors.category_id?.message}
        </p>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="date" value="Transaction date" />
        </div>
        <MyDatePicker
          disabled={disableForm}
          initialValue={{
            startDate: initialData?.date || new Date(),
            endDate: initialData?.date || new Date(),
          }}
          onChange={(v) => {
            setValue('date', v as Date)
          }}
        />
        <p className="text-finamiRed text-sm mt-1">{errors.date?.message}</p>
      </div>
      <div className="md:col-span-2">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Transaction description" />
        </div>
        <Textarea
          id="description"
          placeholder="Leave a description..."
          rows={4}
          disabled={disableForm}
          className="focus:!ring-finamiBlue focus:!border-finamiBlue text-sm"
          {...register('description')}
          onChange={(e) => {
            if (e?.target?.value) {
              setValue('description', e.target.value)
            } else {
              setValue('description', undefined)
            }
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
          disabled={disableForm}
        >
          Save
        </MyButton>
      </div>
    </form>
  )
}

export default TransactionForm