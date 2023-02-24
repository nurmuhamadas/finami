import { WalletDataType } from '../WalletModal/types'

export type WalletsCardProps = {
  data: (WalletDataType & { id: string })[]
  onDeleteClick: (wallet: WalletDataType) => void
  onEditClick: (wallet: WalletDataType) => void
}
