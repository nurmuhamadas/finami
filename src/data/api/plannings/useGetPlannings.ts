import dayjs from 'dayjs'

import { type GetPlanningsQuery } from 'data/types'

import { dummyPlanningsData } from 'utils/constants/dummyData'

export default function useGetPlannings({
  start_month,
  end_month,
  child_id,
  wallet_id,
  category_id,
  search_key,
}: GetPlanningsQuery) {
  let _data = [...dummyPlanningsData]

  if (child_id) {
    _data = _data.filter((d) => d.user_id === child_id)
  }
  if (wallet_id) {
    _data = _data.filter((d) => d.wallet_id === wallet_id)
  }
  if (category_id) {
    _data = _data.filter((d) => d.category_id === category_id)
  }
  if (start_month) {
    _data = _data.filter((d) => !dayjs(d.month).isBefore(start_month, 'month'))
  }
  if (end_month) {
    _data = _data.filter((d) => !dayjs(d.month).isAfter(end_month, 'month'))
  }
  if (search_key) {
    _data = _data.filter((d) =>
      d.name?.toLowerCase().includes(search_key?.toLowerCase()),
    )
  }

  return _data
}
