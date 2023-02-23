import {
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineTransaction,
  AiOutlineUser,
  AiOutlineWallet,
} from 'react-icons/ai'

import { PAGES_URL } from './pages'
import { type MenuType } from './types'

export const bottomMenu: MenuType[] = [
  {
    Icon: AiOutlineDashboard,
    text: 'Overview',
    url: PAGES_URL.overview,
  },
  {
    Icon: AiOutlineWallet,
    text: 'Wallets',
    url: PAGES_URL.wallets,
  },
  {
    Icon: AiOutlineTransaction,
    text: 'Transactions',
    url: PAGES_URL.transactions,
  },
  {
    Icon: AiOutlineCalendar,
    text: 'Plannings',
    url: PAGES_URL.plannings,
  },
  {
    Icon: AiOutlineUser,
    text: 'Account',
    url: PAGES_URL.account,
  },
]
