import { dummyTransactionsData } from 'utils/constants/dummyData'

export default function useGetTransactionById({ id }: { id: string }) {
  const _data = [...dummyTransactionsData]

  return _data.filter((d) => d.id === id)?.[0]
}
