import { type GetCategoriesQuery } from 'data/types'

import { dummyCategoriesData } from 'utils/constants/dummyData'

export default function useGetCategories({
  transaction_type,
}: GetCategoriesQuery) {
  return dummyCategoriesData.filter(
    (d) => d.transaction_type === transaction_type,
  )
}
