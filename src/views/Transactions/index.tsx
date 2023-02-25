import { useState } from 'react'

import AppLayout from 'components/AppLayout'

import FilterTransactions from './components/filter'
import { type FilterTransactionValueType } from './components/types'

const TransactionsPage = () => {
  const [filter, setFilter] = useState<FilterTransactionValueType>({})
  console.log(filter)

  return (
    <AppLayout
      title="Transactions"
      description="Create and delete transactions here"
    >
      <div className="flex flex-col space-y-8">
        <FilterTransactions onChange={setFilter} />
      </div>
    </AppLayout>
  )
}

export default TransactionsPage
