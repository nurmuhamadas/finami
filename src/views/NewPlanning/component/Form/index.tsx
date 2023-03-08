import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { Label } from 'flowbite-react'

import useGetCategories from 'data/api/Categories/useGetCategories'
import useGetWallets from 'data/api/Wallets/useGetWallets'
import { type CreatePlanningPayload } from 'data/types'

import FormInput from 'components/Forms/FormInput'
import FormSelect from 'components/Forms/FormSelect'
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
  const { data: wallets } = useGetWallets()
  const optWallets = mapDataToSelectOptions(wallets, 'id', 'name')
  const { data: categories } = useGetCategories({ transaction_type: 'out' })
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
      <FormInput
        label="Planning name"
        id="name"
        placeholder="Input name..."
        required={true}
        className="finamiInput"
        disabled={disableForm}
        defaultValue={initialData?.name || null}
        {...register('name')}
        onChange={(e) => {
          if (e?.target?.value) {
            setValue('name', e.target.value)
          } else {
            setValue('name', undefined)
          }
        }}
        errorMessage={errors.name?.message}
      />
      <FormInput
        label="Planning name"
        id="amount"
        placeholder="Input amount..."
        required={true}
        className="finamiInput"
        type="number"
        disabled={disableForm}
        defaultValue={initialData?.amount || null}
        {...register('amount')}
        onChange={(e) => {
          if (e?.target?.value) {
            setValue('amount', Number(e.target.value))
          } else {
            setValue('amount', 0)
          }
        }}
        errorMessage={errors.amount?.message}
      />
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
      <FormSelect
        required
        label="Wallet"
        isDisabled={disableForm}
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
        errorMessage={errors.wallet_id?.message}
      />
      <FormSelect
        required
        label="Planning category"
        isDisabled={disableForm}
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
        errorMessage={errors.category_id?.message}
      />
      <div className="md:col-span-2 flex w-full justify-center mt-8">
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
