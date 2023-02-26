import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-tailwindcss-select'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import { yupResolver } from '@hookform/resolvers/yup'
import { Label, Textarea, TextInput } from 'flowbite-react'

import MyButton from 'components/MyButton'
import MyDatePicker from 'components/MyDatePicker'

import { registerTransactionSchema } from './schema'
import {
  type NewTransactionDataType,
  type NewTransactionFormProps,
} from './types'

const NewTransactionForm = ({ onSubmit }: NewTransactionFormProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTransactionDataType>({
    resolver: yupResolver(registerTransactionSchema),
  })

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
          primaryColor="violet"
          placeholder="Select wallet..."
          value={optionsValue.wallet_id}
          onChange={(e: any) => {
            if (e) {
              setValue('wallet_id', e.value)
              handleOptionChange(e, 'wallet_id')
            } else {
              setValue('wallet_id', undefined)
              handleOptionChange(undefined, 'wallet_id')
            }
          }}
          options={[
            { value: 'wallet-1123456789098', label: 'Wallet 1' },
            { value: 'wallet-2', label: 'Wallet 2' },
          ]}
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
          placeholder="20000"
          required={true}
          className="finamiInput"
          type="number"
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
          primaryColor="violet"
          placeholder="Select category..."
          value={optionsValue.category_id}
          onChange={(e: any) => {
            if (e) {
              setValue('category_id', e.value)
              handleOptionChange(e, 'category_id')
            } else {
              setValue('category_id', undefined)
              handleOptionChange(undefined, 'category_id')
            }
          }}
          options={[
            { value: 'Category-11234567898', label: 'Category 1' },
            { value: 'Category-2', label: 'Category 2' },
          ]}
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
        <MyButton type="submit" colorType="primary" className="w-full max-w-md">
          Save
        </MyButton>
      </div>
    </form>
  )
}

export default NewTransactionForm
