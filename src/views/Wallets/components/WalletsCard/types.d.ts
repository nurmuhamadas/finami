import { type WalletDataResponse } from 'data/types'

export type WalletsCardProps = {
  wallets: {
    total: number
    data: WalletDataResponse[]
  }
  showAction?: boolean
  onDeleteClick: (wallet: WalletDataResponse) => void
  onEditClick: (wallet: WalletDataResponse) => void
}
