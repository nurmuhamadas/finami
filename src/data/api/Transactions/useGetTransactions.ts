import dayjs from 'dayjs'

import { type GetTransactionsQuery } from 'data/types'

import { dummyTransactionsData } from 'utils/constants/dummyData'

export default function useGetTransactions(
  {
    child_id,
    transaction_type,
    wallet_id,
    category_id,
    search_key,
    start_date,
    end_date,
  }: GetTransactionsQuery = {
    sort_by: 'date',
    order_by: 'desc',
  },
) {
  let _data = [...dummyTransactionsData]

  if (child_id) {
    _data = _data.filter((d) => d.user_id === child_id)
  }
  if (transaction_type) {
    _data = _data.filter((d) => d.transaction_type === transaction_type)
  }
  if (wallet_id) {
    _data = _data.filter((d) => d.wallet_id === wallet_id)
  }
  if (category_id) {
    _data = _data.filter((d) => d.category_id === category_id)
  }
  if (search_key) {
    _data = _data.filter((d) => d.description.includes(search_key))
  }
  if (start_date) {
    _data = _data.filter(
      (d) =>
        dayjs(d.date).isSame(start_date, 'day') ||
        dayjs(d.date).isAfter(start_date, 'day'),
    )
  }
  if (end_date) {
    _data = _data.filter(
      (d) =>
        dayjs(d.date).isSame(end_date, 'day') ||
        dayjs(d.date).isBefore(end_date, 'day'),
    )
  }

  return _data
}
