import dayjs from 'dayjs'

import { type TransactionDataType } from 'utils/constants/types'

export const groupTransactionByDate = (data: TransactionDataType[]) => {
  const _data: TransactionDataType[][] = []

  data.forEach((d) => {
    const i = _data.findIndex((t) => t[0].date === d.date)
    if (i < 0) {
      _data.push([d])
    } else {
      _data[i].push(d)
    }
  })

  return _data.sort((a, b) => (dayjs(a[0].date).isAfter(b[0].date) ? -1 : 1))
}

export const calcTotalTransaction = (data: TransactionDataType[]) => {
  let inFlow = 0
  let outFlow = 0
  data.forEach((d) => {
    if (d.transactionType === 'in') inFlow = inFlow + Number(d.amount || 0)
    else outFlow = outFlow + Number(d.amount || 0)
  })

  return {
    in: inFlow,
    out: outFlow,
    total: inFlow - outFlow,
  }
}
