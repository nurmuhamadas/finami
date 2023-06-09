export const PAGES_URL = {
  login: { url: '/login', title: 'Login' },
  signup: { url: '/signup', title: 'Signup' },

  overview: { url: '/app/dashboard', title: 'Overview' },

  transactions: { url: '/app/transactions', title: 'Transactions' },
  transactions_new: {
    url: '/app/transactions/new',
    title: 'Create New Transaction',
  },
  transactions_detail: {
    url: '/app/transactions/transaction',
    title: 'Detail Transaction',
  },
  transactions_analytics: {
    url: '/app/transactions/analytics',
    title: 'Transaction Analytics',
  },

  wallets: { url: '/app/wallets', title: 'Wallets' },

  plannings: { url: '/app/plannings', title: 'Plannings' },
  plannings_new: { url: '/app/plannings/new', title: 'Create New Planning' },
  plannings_detail: {
    url: '/app/plannings/planning',
    title: 'Detail Plannings',
  },
  plannings_analytics: {
    url: '/app/plannings/analytics',
    title: 'Planning Analytics',
  },

  account: { url: '/app/account', title: 'My Account' },
  account_setting: { url: '/app/account/setting', title: 'Account Setting' },
  account_profile: { url: '/app/account/profile', title: 'Profile Setting' },
  account_member_setting: {
    url: '/app/account/member_setting',
    title: 'Member Setting',
  },
  account_categories_setting: {
    url: '/app/account/category_setting',
    title: 'Categories Setting',
  },
  account_logout: { url: '/app/account/logout', title: 'Logout' },

  home: { url: '/', title: 'Home' },
  about: { url: '/about', title: 'About Finami' },
  learn: { url: '/learn', title: 'Financial Knowledge' },
  teams: { url: '/teams', title: 'Our Teams' },
}

export const QUERY_URL = {
  transactions_analytics: {
    startDate: 'sd',
    endDate: 'ed',
    wallet_id: 'w',
    category_id: 'c',
    user_id: 'u',
    transaction_type: 't',
    search_key: 'q',
  },
  plannings: {
    month: 'm',
    wallet_id: 'w',
    category_id: 'c',
    user_id: 'u',
    search_key: 'q',
  },
}

export const ONLY_PUBLIC_PAGE = [PAGES_URL.login.url, PAGES_URL.signup.url]
