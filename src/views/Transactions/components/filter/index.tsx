import React, { useEffect, useState } from 'react'
import { AiFillFilter } from 'react-icons/ai'
import Select from 'react-tailwindcss-select'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import cn from 'classnames'
import dayjs from 'dayjs'
import { Label } from 'flowbite-react'

import useGetCategories from 'data/api/Categories/useGetCategories'
import useGetUsers from 'data/api/Users/useGetUsers'
import useGetWallets from 'data/api/Wallets/useGetWallets'
import {
  type CategoryDataResponse,
  type UserDataResponse,
  type WalletDataResponse,
} from 'data/types'

import MyButton from 'components/MyButton'
import MyDatePicker from 'components/MyDatePicker'
import { mapDataToSelectOptions } from 'utils/constants/common'
import { dayjsToDate } from 'utils/helpers/formatter'

import {
  type FilterTransactionsProps,
  type FilterTransactionValueType,
} from './types'

const FilterTransactions = ({
  onChange,
  loading,
  hide = {},
  wrapperClassName,
  startComponent,
  endComponent,
  initialValues,
}: FilterTransactionsProps) => {
  let initial = true
  const [isShowFilter, setIsShowFilter] = useState(false)
  const [values, setValues] = useState<FilterTransactionValueType>({})
  const [optionsState, setOptionsState] = useState({
    child_id: undefined,
    wallet_id: undefined,
    category_id: undefined,
  })

  const optCategory = mapDataToSelectOptions<CategoryDataResponse>(
    useGetCategories(),
    'id',
    'name',
  )

  const optUser = mapDataToSelectOptions<UserDataResponse>(
    useGetUsers(),
    'id',
    'fullname',
  )

  const optWallet = mapDataToSelectOptions<WalletDataResponse>(
    useGetWallets(),
    'id',
    'name',
  )

  const handleChange = (e: Option, name: keyof FilterTransactionValueType) => {
    const _value = {
      ...values,
      [name]: e ? e.value : undefined,
    }
    onChange(_value)
    setValues(_value)
    setOptionsState({
      ...optionsState,
      [name]: e,
    })
  }

  useEffect(() => {
    if (initialValues && initial) {
      setValues(initialValues)
    }
    initial = false
  }, [initialValues])

  return (
    <div className={cn(wrapperClassName, 'block')}>
      <div className="flex justify-between items-center flex-wrap py-2 space-2">
        <div className="flex flex-wrap py-2 space-2">{startComponent}</div>
        <div className="flex justify-end flex-wrap py-2 space-2">
          <MyButton
            colorType="primary"
            onClick={() => {
              setIsShowFilter(!isShowFilter)
            }}
          >
            <AiFillFilter />
          </MyButton>
          {endComponent}
        </div>
      </div>
      <div
        className={cn('grid sm:grid-cols-2 md:grid-cols-3 gap-3', {
          hidden: !isShowFilter,
        })}
      >
        <div className={cn({ hidden: hide.date })}>
          <div className="mb-1 block">
            <Label value="Date" />
          </div>
          <MyDatePicker
            disabled={loading}
            initialValue={{
              startDate: initialValues.startDate,
              endDate: initialValues.endDate,
            }}
            onChange={(d) => {
              const [s, e] = d as Date[]
              const v: FilterTransactionValueType = {
                ...values,
                startDate: dayjsToDate(dayjs(s).startOf('day')),
                endDate: dayjsToDate(dayjs(e).endOf('day')),
              }
              setValues(v)
              onChange(v)
            }}
            range
            showShorcut
          />
        </div>
        <div className={cn({ hidden: hide.category })}>
          <div className="mb-1 block">
            <Label value="Category" />
          </div>
          <Select
            isClearable
            isSearchable
            isDisabled={loading}
            primaryColor="violet"
            value={optionsState.category_id}
            onChange={(e) => {
              handleChange(e as Option, 'category_id')
            }}
            options={optCategory}
          />
        </div>
        <div className={cn({ hidden: hide.user })}>
          <div className="mb-1 block">
            <Label value="User" />
          </div>
          <Select
            isClearable
            isDisabled={loading}
            primaryColor="violet"
            value={optionsState.child_id}
            onChange={(e) => {
              handleChange(e as Option, 'child_id')
            }}
            options={optUser}
          />
        </div>
        <div className={cn({ hidden: hide.wallet })}>
          <div className="mb-1 block">
            <Label value="Wallet" />
          </div>
          <Select
            isClearable
            isDisabled={loading}
            primaryColor="violet"
            value={optionsState.wallet_id}
            onChange={(e) => {
              handleChange(e as Option, 'wallet_id')
            }}
            options={optWallet}
          />
        </div>
      </div>
    </div>
  )
}

export default FilterTransactions
