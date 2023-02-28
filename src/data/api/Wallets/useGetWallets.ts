import { dummyWalletssData } from 'utils/constants/dummyData'

interface UseGetWalletsProps {
  user_id?: string
}

export default function useGetWallets({ user_id }: UseGetWalletsProps = {}) {
  let _data = [...dummyWalletssData]

  if (user_id) {
    _data = _data.filter((d) => d.user_id === user_id)
  }

  return _data
}
