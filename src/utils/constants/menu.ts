import {
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineTransaction,
  AiOutlineUser,
  AiOutlineWallet,
} from 'react-icons/ai'

import { type MenuType } from './types'

export const bottomMenu: MenuType[] = [
  {
    Icon: AiOutlineDashboard,
    text: 'Dashboard',
    url: '/app/dashboard',
  },
  {
    Icon: AiOutlineWallet,
    text: 'Wallets',
    url: '/app/wallets',
  },
  {
    Icon: AiOutlineTransaction,
    text: 'Transactions',
    url: '/app/transactions',
  },
  {
    Icon: AiOutlineCalendar,
    text: 'Plannings',
    url: '/app/plannings',
  },
  {
    Icon: AiOutlineUser,
    text: 'Account',
    url: '/app/account',
  },
]
