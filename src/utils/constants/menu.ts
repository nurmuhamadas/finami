import {
  AiOutlineAppstoreAdd,
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineExperiment,
  AiOutlineInfoCircle,
  AiOutlineSetting,
  AiOutlineTransaction,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineWallet,
} from 'react-icons/ai'

import { PAGES_URL } from './pages'
import { type MenuType } from './types'

export const accountMenu: MenuType[] = [
  {
    Icon: AiOutlineUser,
    text: PAGES_URL.account_profile.title,
    url: PAGES_URL.account_profile.url,
  },
  {
    Icon: AiOutlineUsergroupAdd,
    text: PAGES_URL.account_member_setting.title,
    url: PAGES_URL.account_member_setting.url,
  },
  {
    Icon: AiOutlineAppstoreAdd,
    text: PAGES_URL.account_categories_setting.title,
    url: PAGES_URL.account_categories_setting.url,
  },
  {
    Icon: AiOutlineSetting,
    text: PAGES_URL.account_setting.title,
    url: PAGES_URL.account_setting.url,
  },
  {
    Icon: AiOutlineExperiment,
    text: PAGES_URL.learn.title,
    url: PAGES_URL.learn.url,
  },
  {
    Icon: AiOutlineInfoCircle,
    text: PAGES_URL.about.title,
    url: PAGES_URL.about.url,
  },
]

export const sideMenu: MenuType[] = [
  {
    Icon: AiOutlineDashboard,
    text: PAGES_URL.overview.title,
    url: PAGES_URL.overview.url,
  },
  {
    Icon: AiOutlineWallet,
    text: PAGES_URL.wallets.title,
    url: PAGES_URL.wallets.url,
  },
  {
    Icon: AiOutlineTransaction,
    text: PAGES_URL.transactions.title,
    url: PAGES_URL.transactions.url,
  },
  {
    Icon: AiOutlineCalendar,
    text: PAGES_URL.plannings.title,
    url: PAGES_URL.plannings.url,
  },
  {
    Icon: AiOutlineUser,
    text: 'Account',
    url: PAGES_URL.account.url,
    child: accountMenu,
  },
]

export const bottomMenu: MenuType[] = [
  {
    Icon: AiOutlineDashboard,
    text: 'Overview',
    url: PAGES_URL.overview.url,
  },
  {
    Icon: AiOutlineWallet,
    text: 'Wallets',
    url: PAGES_URL.wallets.url,
  },
  {
    Icon: AiOutlineTransaction,
    text: 'Transactions',
    url: PAGES_URL.transactions.url,
  },
  {
    Icon: AiOutlineCalendar,
    text: 'Plannings',
    url: PAGES_URL.plannings.url,
  },
  {
    Icon: AiOutlineUser,
    text: 'Account',
    url: PAGES_URL.account.url,
  },
]

export const parentOnlyUrl = [PAGES_URL.account_member_setting.url]
