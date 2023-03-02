import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-tailwindcss-select'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { Label, TextInput } from 'flowbite-react'

import useGetCategories from 'data/api/Categories/useGetCategories'
import useGetWallets from 'data/api/Wallets/useGetWallets'
import { type CreatePlanningPayload } from 'data/types'

import MyButton from 'components/MyButton'
import MyDatePicker from 'components/MyDatePicker'
import { mapDataToSelectOptions } from 'utils/helpers/helper'

import { registerPlanningSchema } from './schema'
import { type PlanningFormProps } from './types'

const PlanningForm = ({
  initialData,
  disableForm,
  onSubmit,
}: PlanningFormProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePlanningPayload>({
    resolver: yupResolver(registerPlanningSchema),
  })

  // OPTIONS
  const wallets = useGetWallets()
  const optWallets = mapDataToSelectOptions(wallets, 'id', 'name')
  const categories = useGetCategories({ transaction_type: 'out' })
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
      setValue('month', initialData.month)
      setValue('name', initialData.name)

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
          <Label htmlFor="name" value="Planning name" />
        </div>
        <TextInput
          id="name"
          placeholder="Input name..."
          required={true}
          className="finamiInput"
          disabled={disableForm}
          {...register('name')}
          onChange={(e) => {
            if (e?.target?.value) {
              setValue('name', e.target.value)
            } else {
              setValue('name', undefined)
            }
          }}
        />
        <p className="text-finamiRed text-sm mt-1">{errors.name?.message}</p>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="amount" value="Planning amount" />
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
          <Label htmlFor="month" value="Planning month" />
        </div>
        <MyDatePicker
          disabled={disableForm}
          initialValue={{
            startDate: initialData?.month || new Date(),
            endDate: initialData?.month || new Date(),
          }}
          onChange={(v) => {
            setValue('month', v as Date)
          }}
          displayFormat="MMM YYYY"
          disabledDates={[
            {
              startDate: dayjs('1950-01-01').toDate(),
              endDate: dayjs().subtract(1, 'month').endOf('month').toDate(),
            },
          ]}
        />
        <p className="text-finamiRed text-sm mt-1">{errors.month?.message}</p>
      </div>
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
          <Label htmlFor="category_id" value="Planning category" />
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

export default PlanningForm
