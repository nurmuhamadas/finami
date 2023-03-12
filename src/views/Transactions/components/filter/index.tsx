import React, { useEffect, useState } from 'react'
import { AiFillFilter } from 'react-icons/ai'
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

import FormSelect from 'components/Forms/FormSelect'
import MyButton from 'components/MyButton'
import MyDatePicker from 'components/MyDatePicker'
import { TRANSACTION_TYPES_OPT } from 'utils/constants/common'
import { dayjsToDate } from 'utils/helpers/formatter'
import { mapDataToSelectOptions } from 'utils/helpers/helper'

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
    transaction_type: undefined,
  })

  const { data: categories, isLoading: isCatLoading } = useGetCategories(
    {
      transaction_type: values.transaction_type,
    },
    { enabled: !hide.category && isShowFilter },
  )
  const optCategory = mapDataToSelectOptions<CategoryDataResponse>(
    categories,
    'id',
    'name',
  )

  const { data: users, isLoading: isUserLoading } = useGetUsers(
    {},
    { enabled: !hide.user && isShowFilter },
  )
  const optUser = mapDataToSelectOptions<UserDataResponse>(
    users,
    'id',
    'fullname',
  )

  const { data: wallets, isLoading: isWalletLoading } = useGetWallets(
    {},
    { enabled: !hide.wallet && isShowFilter },
  )
  const optWallet = mapDataToSelectOptions<WalletDataResponse>(
    wallets,
    'id',
    'name',
  )

  const handleChange = (e: Option, name: keyof FilterTransactionValueType) => {
    let type = null
    if (name === 'category_id') {
      type = categories.find((d) => d.id === e?.value)?.transaction_type
    }

    const _value = {
      ...values,
      transaction_type: type || values.transaction_type,
      [name]: e ? e.value : undefined,
    }
    onChange(_value)
    setValues(_value)
    setOptionsState({
      ...optionsState,
      transaction_type: type || optionsState.transaction_type,
      [name]: e,
    })
  }

  useEffect(() => {
    if (
      initialValues &&
      initial &&
      !isCatLoading &&
      !isUserLoading &&
      !isWalletLoading
    ) {
      setValues(initialValues)

      const _ca = optCategory?.find(
        (d) => d.value === initialValues.category_id,
      )
      const _c = optUser?.find((d) => d.value === initialValues.child_id)
      const _w = optWallet?.find((d) => d.value === initialValues.wallet_id)
      const _t = TRANSACTION_TYPES_OPT?.find(
        (d) => d.value === initialValues.transaction_type,
      )
      setOptionsState({
        category_id: _ca,
        child_id: _c,
        wallet_id: _w,
        transaction_type: _t,
      })
    }
    initial = false
  }, [initialValues, isCatLoading, isUserLoading, isWalletLoading])

  return (
    <div className={cn(wrapperClassName, 'block')}>
      <div className="flex justify-between items-center flex-wrap py-2 space-2">
        <div className="flex flex-wrap py-2 space-2">{startComponent}</div>
        <div className="flex justify-end flex-wrap py-2 items-center space-x-2">
          {endComponent}
          <MyButton
            colorType="primary"
            onClick={() => {
              setIsShowFilter(!isShowFilter)
            }}
          >
            <AiFillFilter />
          </MyButton>
        </div>
      </div>
      <div
        className={cn('grid sm:grid-cols-2 xl:grid-cols-3 gap-3', {
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
              if (!hide.date) {
                const [s, e] = d as Date[]
                const v: FilterTransactionValueType = {
                  ...values,
                  startDate: dayjsToDate(dayjs(s).startOf(s ? 'day' : 'month')),
                  endDate: dayjsToDate(dayjs(e).endOf(e ? 'day' : 'month')),
                }
                setValues(v)
                onChange(v)
              }
            }}
            range
            showShorcut
          />
        </div>
        <FormSelect
          isClearable
          isDisabled={loading}
          wrapperClassName={cn({ hidden: hide.type })}
          label="Transaction type"
          value={optionsState.transaction_type}
          options={TRANSACTION_TYPES_OPT}
          onChange={(e) => {
            if (!hide.wallet) {
              handleChange(e as Option, 'transaction_type')
            }
          }}
        />
        <FormSelect
          isClearable
          isSearchable
          isDisabled={loading}
          wrapperClassName={cn({ hidden: hide.category })}
          label="Category"
          value={optionsState.category_id}
          onChange={(e) => {
            if (!hide.category) {
              handleChange(e as Option, 'category_id')
            }
          }}
          options={optCategory}
        />
        <FormSelect
          isClearable
          isSearchable
          isDisabled={loading}
          wrapperClassName={cn({ hidden: hide.user })}
          label="User"
          value={optionsState.child_id}
          onChange={(e) => {
            if (!hide.user) {
              handleChange(e as Option, 'child_id')
            }
          }}
          options={optUser}
        />
        <FormSelect
          isClearable
          isSearchable
          isDisabled={loading}
          wrapperClassName={cn({ hidden: hide.wallet })}
          label="Wallet"
          value={optionsState.wallet_id}
          onChange={(e) => {
            if (!hide.wallet) {
              handleChange(e as Option, 'wallet_id')
            }
          }}
          options={optWallet}
        />
      </div>
    </div>
  )
}

export default FilterTransactions
