import React, { useState } from 'react'
import { AiFillFilter } from 'react-icons/ai'
import Select from 'react-tailwindcss-select'

import cn from 'classnames'
import dayjs from 'dayjs'
import { Label } from 'flowbite-react'

import MyButton from 'components/MyButton'
import MyDatePicker from 'components/MyDatePicker'

import {
  type FilterTransactionsProps,
  type FilterTransactionValueType,
} from './types'

const FilterTransactions = ({
  onChange,
  loading,
  hide = {},
  wrapperClassName,
}: FilterTransactionsProps) => {
  const [isShowFilter, setIsShowFilter] = useState(false)
  const [values, setValues] = useState<FilterTransactionValueType>({})
  const [optionsState, setOptionsState] = useState({
    user_id: undefined,
    wallet_id: undefined,
  })

  // TODO: change from API
  const optUser = [
    { value: 'user-1', label: 'User 1' },
    { value: 'user-2', label: 'User 2' },
    { value: 'user-3', label: 'User 3' },
  ]

  // TODO: change from API
  const optWallet = [
    { value: 'wallet-1', label: 'Wallet 1' },
    { value: 'wallet-2', label: 'Wallet 2' },
    { value: 'wallet-3', label: 'Wallet 3' },
  ]

  const handleChange = (e: any, name: 'user_id' | 'wallet_id') => {
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

  return (
    <div className={cn(wrapperClassName, 'block')}>
      <div className="flex justify-end py-2">
        <MyButton
          colorType="primary"
          onClick={() => {
            setIsShowFilter(!isShowFilter)
          }}
        >
          <AiFillFilter />
        </MyButton>
      </div>
      <div
        className={cn('grid sm:grid-cols-2 md:grid-cols-3 gap-3', {
          hidden: !isShowFilter,
        })}
      >
        <div className={cn({ hidden: hide.user })}>
          <div className="mb-1 block">
            <Label value="User" />
          </div>
          <Select
            isClearable
            isDisabled={loading}
            primaryColor="violet"
            value={optionsState.user_id}
            onChange={(e) => {
              handleChange(e, 'user_id')
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
              handleChange(e, 'wallet_id')
            }}
            options={optWallet}
          />
        </div>
        <div className={cn({ hidden: hide.date })}>
          <div className="mb-1 block">
            <Label value="Date" />
          </div>
          <MyDatePicker
            disabled={loading}
            onChange={(d) => {
              const [s, e] = d as Date[]

              setValues({
                ...values,
                date: [
                  dayjs(s).startOf('day').toISOString(),
                  dayjs(e).endOf('day').toISOString(),
                ],
              })
            }}
            range
            showShorcut
          />
        </div>
      </div>
    </div>
  )
}

export default FilterTransactions
