import { dummyUsersData } from 'utils/constants/dummyData'

interface UseGetUserByIdProps {
  id: string
}

export default function useGetUserById({ id }: UseGetUserByIdProps) {
  return dummyUsersData.filter((d) => d.id === id)?.[0]
}
