import { type WalletDataResponse } from 'data/types'

export type WalletsCardProps = {
  wallets: {
    total: number
    data: WalletDataResponse[]
  }
  onDeleteClick: (wallet: WalletDataResponse) => void
  onEditClick: (wallet: WalletDataResponse) => void
}
