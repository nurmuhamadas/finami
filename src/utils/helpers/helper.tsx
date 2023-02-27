import dayjs from 'dayjs'

import { type TransactionDataResponse } from 'data/types'

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
