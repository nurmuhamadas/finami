import cn from 'classnames'

import { formatCurrency, formatDate } from 'utils/helpers/formatter'

import { type TransactionListItemProps } from './types'

const TransactionListItem = ({ data, className }: TransactionListItemProps) => {
  const isTransactionIn = data.transactionType === 'in'
  const isTransactionOut = data.transactionType === 'out'

  return (
    <li
      key={data.id}
      className={cn('flex items-center justify-between space-x-4', className)}
    >
      <div className="flex flex-col space-y-1">
        <span className="text-sm">{data.name}</span>
        <span className="text-xs text-gray-400">
          {formatDate(data.date, 'MM, dd yyyy')}
        </span>
      </div>
      <span
        className={cn('text-sm font-semibold', {
          'text-finamiGreen': isTransactionIn,
          'text-finamiRed': isTransactionOut,
        })}
      >
        {isTransactionIn ? '+' : '-'} Rp. {formatCurrency(data.amount)}
      </span>
    </li>
  )
}

export default TransactionListItem
