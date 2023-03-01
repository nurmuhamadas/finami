import { type Option } from 'react-tailwindcss-select/dist/components/type'

import dayjs from 'dayjs'

import {
  type TransactionDataResponse,
  type WalletDataResponse,
} from 'data/types'

import { type PlanningDataType } from 'utils/constants/types'

interface GroupTransactionByDateResult {
  inAmount: number
  outAmount: number
  totalAmount: number
  data: Array<{
    inAmount: number
    outAmount: number
    totalAmount: number
    date: Date
    data: TransactionDataResponse[]
  }>
}

export const groupTransactionByDate = (
  data: TransactionDataResponse[],
): GroupTransactionByDateResult => {
  const _sortedData = data.sort((a, b) =>
    dayjs(a.date).isAfter(b.date) ? -1 : 1,
  )

  const _data: GroupTransactionByDateResult = {
    inAmount: 0,
    outAmount: 0,
    totalAmount: 0,
    data: [],
  }

  _sortedData.forEach((d) => {
    const i = _data.data.findIndex((f) => dayjs(f.date).isSame(d.date, 'day'))

    // Main Calculation
    if (d.transaction_type === 'in') _data.inAmount += d.amount
    if (d.transaction_type === 'out') _data.outAmount += d.amount
    _data.totalAmount = _data.inAmount - _data.outAmount

    if (i < 0) {
      // Data collection
      _data.data.push({
        inAmount: d.transaction_type === 'in' ? d.amount : 0,
        outAmount: d.transaction_type === 'in' ? d.amount : 0,
        totalAmount: d.transaction_type === 'in' ? d.amount : -d.amount,
        date: d.date,
        data: [d],
      })
    } else {
      const _d = _data.data[i]
      _data.data[i] = {
        inAmount: _d.inAmount + (d.transaction_type === 'in' ? d.amount : 0),
        outAmount: _d.outAmount + (d.transaction_type === 'in' ? d.amount : 0),
        totalAmount:
          _d.totalAmount + (d.transaction_type === 'in' ? d.amount : -d.amount),
        date: _d.date,
        data: [..._d.data, d],
      }
    }
  })

  return _data
}

export const calcTotalTransaction = (data: TransactionDataResponse[]) => {
  let inFlow = 0
  let outFlow = 0
  data.forEach((d) => {
    if (d.transaction_type === 'in') inFlow = inFlow + Number(d.amount || 0)
    else outFlow = outFlow + Number(d.amount || 0)
  })

  return {
    in: inFlow,
    out: outFlow,
    total: inFlow - outFlow,
  }
}

export const groupPlanningsByUser = (
  data: PlanningDataType[],
): PlanningDataType[][] => {
  const _data: PlanningDataType[][] = []

  data.forEach((d) => {
    const i = _data.findIndex((p) => p[0].user_id === d.user_id)
    if (i < 0) {
      _data.push([d])
    } else {
      _data[i].push(d)
    }
  })

  return _data
}
interface GroupWalletsByUserId {
  total: number
  data: Array<{
    total: number
    user_id: string
    user_name: string
    user_fullname: string
    is_owner: boolean
    data: WalletDataResponse[]
  }>
}

export const groupWalletsByUser = (
  data: WalletDataResponse[],
): GroupWalletsByUserId => {
  const _data: GroupWalletsByUserId = {
    total: 0,
    data: [],
  }

  data.forEach((d) => {
    const i = _data.data.findIndex((p) => p.user_id === d.user_id)

    // Calculate Main Total
    _data.total += d.balance

    if (i < 0) {
      _data.data.push({
        total: d.balance,
        user_id: d.user_id,
        user_name: d.user_name,
        user_fullname: d.user_fullname,
        is_owner: d.is_owner,
        data: [d],
      })
    } else {
      const _d = _data.data[i]
      _data.data[i] = {
        ..._d,
        total: _d.total + d.balance,
        data: [..._d.data, d],
      }
    }
  })

  return _data
}

export function mapDataToSelectOptions<T>(
  data: T[],
  valueSelector: keyof T,
  labelSelector: keyof T,
): Option[] {
  return data.map((d) => ({
    label: d[labelSelector] as string,
    value: d[valueSelector] as string,
  }))
}

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout = 300,
): (...args: Params) => void {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}
