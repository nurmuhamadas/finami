import { dummyPlanningsData } from 'utils/constants/dummyData'

interface UseGetPlanningByIdProps {
  id: string
}

export default function useGetPlanningById({ id }: UseGetPlanningByIdProps) {
  const _data = [...dummyPlanningsData]

  return _data.filter((d) => d.id === id)?.[0]
}
