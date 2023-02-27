import { type GetCategoriesQuery } from 'data/types'

import { dummyCategoriesData } from 'utils/constants/dummyData'

export default function useGetCategories({
  transaction_type,
}: GetCategoriesQuery = {}) {
  let data = dummyCategoriesData

  if (transaction_type) {
    data = data.filter((d) => d.transaction_type === transaction_type)
  }

  return data.filter((d) => d.is_owner)
}
