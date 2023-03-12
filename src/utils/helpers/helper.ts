import { type Option } from 'react-tailwindcss-select/dist/components/type'

import { enc } from 'crypto-js'
import AES from 'crypto-js/aes'
import dayjs from 'dayjs'

import {
  type CategoryDataResponse,
  type PlanningDataResponse,
  type TransactionDataResponse,
  type WalletDataResponse,
} from 'data/types'

import { LOCAL_STORAGE } from 'utils/constants/common'

import { getStartEndDateOfWeeks } from './dates'

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
        outAmount: d.transaction_type === 'out' ? d.amount : 0,
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
interface GroupTransactionByWeekResult {
  inAmount: number
  outAmount: number
  totalAmount: number
  data: Array<{
    inAmount: number
    outAmount: number
    totalAmount: number
    dateRange: string[]
    data: TransactionDataResponse[]
  }>
}

export const groupTransactionByWeek = (
  data: TransactionDataResponse[],
  { startDate, endDate }: { startDate: Date; endDate: Date },
): GroupTransactionByWeekResult => {
  const dateRanges = getStartEndDateOfWeeks(startDate, endDate)
  const _data: GroupTransactionByWeekResult = {
    inAmount: 0,
    outAmount: 0,
    totalAmount: 0,
    data: [],
  }

  dateRanges.forEach(([s, e]) => {
    const _d = {
      inAmount: 0,
      outAmount: 0,
      totalAmount: 0,
      dateRange: [s, e],
      data: [] as TransactionDataResponse[],
    }
    data
      .filter(
        (d) =>
          dayjs(d.date).isAfter(dayjs(s).add(-1, 'day').endOf('day')) &&
          dayjs(d.date).isBefore(dayjs(e).add(1, 'day').startOf('day')),
      )
      ?.forEach((d) => {
        _d.inAmount += d.transaction_type === 'in' ? d.amount : 0
        _d.outAmount += d.transaction_type === 'out' ? d.amount : 0
        _d.totalAmount += d.transaction_type === 'in' ? d.amount : -d.amount
        _d.data.push(d)
      })

    _data.inAmount += _d.inAmount
    _data.outAmount += _d.outAmount
    _data.totalAmount += _d.totalAmount
    _data.data.push(_d)
  })

  return _data
}

export interface GroupTransactionByCategoryResult {
  inAmount: number
  outAmount: number
  totalAmount: number
  data: Array<{
    inAmount: number
    outAmount: number
    totalAmount: number
    category_id: string
    category_name: string
    data: TransactionDataResponse[]
  }>
}

export const groupTransactionByCategory = (
  data: TransactionDataResponse[],
): GroupTransactionByCategoryResult => {
  const _sortedData = data.sort((a, b) =>
    dayjs(a.date).isAfter(b.date) ? -1 : 1,
  )

  const _data: GroupTransactionByCategoryResult = {
    inAmount: 0,
    outAmount: 0,
    totalAmount: 0,
    data: [],
  }

  _sortedData.forEach((d) => {
    const i = _data.data.findIndex((f) => f.category_id === d.category_id)

    // Main Calculation
    if (d.transaction_type === 'in') _data.inAmount += d.amount
    if (d.transaction_type === 'out') _data.outAmount += d.amount
    _data.totalAmount = _data.inAmount - _data.outAmount

    if (i < 0) {
      // Data collection
      _data.data.push({
        inAmount: d.transaction_type === 'in' ? d.amount : 0,
        outAmount: d.transaction_type === 'out' ? d.amount : 0,
        totalAmount: d.transaction_type === 'in' ? d.amount : -d.amount,
        category_id: d.category_id,
        category_name: d.category_name,
        data: [d],
      })
    } else {
      const _d = _data.data[i]
      _data.data[i] = {
        inAmount: _d.inAmount + (d.transaction_type === 'in' ? d.amount : 0),
        outAmount: _d.outAmount + (d.transaction_type === 'in' ? d.amount : 0),
        totalAmount:
          _d.totalAmount + (d.transaction_type === 'in' ? d.amount : -d.amount),
        category_id: _d.category_id,
        category_name: _d.category_name,
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
  data: PlanningDataResponse[],
): PlanningDataResponse[][] => {
  const _data: PlanningDataResponse[][] = []

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

export const groupCategoriesByUser = (
  data: TransactionDataResponse[],
): TransactionDataResponse[][] => {
  const _data: TransactionDataResponse[][] = []

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

  data?.forEach((d) => {
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
  return data?.map((d) => ({
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

interface GroupCategoriesByGroup {
  group: string
  data: CategoryDataResponse[]
}

export const groupCategoriesByGroup = (
  data: CategoryDataResponse[],
): GroupCategoriesByGroup[] => {
  const _data: GroupCategoriesByGroup[] = []

  data.forEach((d) => {
    const i = _data.findIndex((c) => c.group === d.group)

    if (i < 0) {
      _data.push({
        group: d.group,
        data: [d],
      })
    } else {
      _data[i] = {
        group: d.group,
        data: [..._data[i].data, d],
      }
    }
  })

  return _data
}

export const encryptText = (text: string) => {
  const salt = process.env.SALT
  return AES.encrypt(text, salt).toString()
}

export const decryptText = (text: string) => {
  const salt = process.env.SALT
  return AES.decrypt(text, salt).toString(enc.Utf8)
}

export const saveAuthToLocal = ({
  accessToken,
  refreshToken,
  user,
}: {
  accessToken?: string
  refreshToken?: string
  user?: {
    id: string
    username: string
    email: string
    fullname: string
    parent_id: string
    image_url: string
  }
}) => {
  if (accessToken)
    localStorage.setItem(LOCAL_STORAGE.accessTokenKey, encryptText(accessToken))
  if (refreshToken)
    localStorage.setItem(
      LOCAL_STORAGE.refreshTokenKey,
      encryptText(refreshToken),
    )
  if (user)
    localStorage.setItem(
      LOCAL_STORAGE.userKey,
      encryptText(JSON.stringify(user)),
    )
}

export const getAuthFromLocal = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.accessTokenKey)
  const refreshToken = localStorage.getItem(LOCAL_STORAGE.refreshTokenKey)
  const user = localStorage.getItem(LOCAL_STORAGE.userKey)

  return {
    accessToken: accessToken ? decryptText(accessToken) : undefined,
    refreshToken: refreshToken ? decryptText(refreshToken) : undefined,
    user: user ? decryptText(user) : undefined,
  }
}

export function urlQueryGenerator<T>(url: string, query: T): string {
  let q = ''
  if (query) {
    Object.entries(query)?.forEach(([key, val]) => {
      if (val) {
        if (key.includes('date')) {
          if (q === '') q += `${key}=${(val as Date).toISOString()}`
          else q += `&${key}=${(val as Date).toISOString()}`
        } else {
          if (q === '') q += `${key}=${val as string}`
          else q += `&${key}=${val as string}`
        }
      }
    })
  }

  return `${url}?${q}`
}

export function calculateRatio(base: number, comparation: number, rounded = 2) {
  const diff = (base || 0) - (comparation || 0)
  let ratio = (diff / (comparation || 1)) * 100

  if (comparation === 0) {
    ratio = 100
  }

  return `${diff >= 0 ? '+' : ''}${ratio.toFixed(rounded)}%`
}
