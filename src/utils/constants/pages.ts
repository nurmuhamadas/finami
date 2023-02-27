export const PAGES_URL = {
  overview: { url: '/app/dashboard', title: 'Dashboard' },
  transactions: { url: '/app/transactions', title: 'Transactions' },
  transactions_new: {
    url: '/app/transactions/new',
    title: 'Create New Transaction',
  },
  transactions_analytics: {
    url: '/app/transactions/analytics',
    title: 'Transaction Analytics',
  },
  wallets: { url: '/app/wallets', title: 'Wallets' },
  plannings: { url: '/app/plannings', title: 'Plannings' },
  plannings_new: { url: '/app/plannings/new', title: 'Create New Planning' },
  plannings_analytics: {
    url: '/app/plannings/analytics',
    title: 'Planning Analytics',
  },
  analytics: { url: '/app/analytics', title: 'Analytics' },
  account: { url: '/app/account', title: 'My Account' },
  setting: { url: '/app/account/setting', title: 'Setting' },
}

export const QUERY_URL = {
  transactions_analytics: {
    start_date: 'sd',
    end_date: 'ed',
    wallet: 'w',
    category: 'c',
    user: 'u',
  },
}
