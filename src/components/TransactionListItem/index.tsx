import cn from 'classnames'

import { formatCurrency, formatDate } from 'utils/helpers/formatter'

import { type TransactionListItemProps } from './types'

const TransactionListItem = ({
  data,
  className,
  onClick,
  showDate,
  showDescription,
  showUser,
  disableAmountFormatting,
}: TransactionListItemProps) => {
  const isTransactionIn = data.transaction_type === 'in'
  const isTransactionOut = data.transaction_type === 'out'
  const inOutSign = isTransactionIn ? '+' : '-'

  return (
    <li
      key={data.id}
      role={onClick ? 'button' : 'list'}
      className={cn(
        'flex items-center justify-between space-x-4 w-full',
        { 'hover:bg-gray-100 p-3 rounded-lg': !!onClick },
        className,
      )}
      onClick={
        onClick
          ? () => {
              onClick(data)
            }
          : undefined
      }
    >
      <div className="flex flex-col space-y-2 overflow-hidden w-full">
        <div className="flex w-full items-center justify-between">
          <span className="fonsem">{data.category_name}</span>
          <span
            className={cn('text-sm font-semibold', {
              'text-finamiGreen': !disableAmountFormatting && isTransactionIn,
              'text-finamiRed': !disableAmountFormatting && isTransactionOut,
            })}
          >
            {!disableAmountFormatting ? inOutSign : ''} Rp.{' '}
            {formatCurrency(data.amount)}
          </span>
        </div>
        <div
          className={cn('flex items-center justify-between', {
            'space-x-2': showUser && showDate,
          })}
        >
          <span
            className={cn('text-sm text-gray-500', {
              hidden: !showUser,
            })}
          >
            By: {data.user_fullname}
          </span>
          <span className={cn('text-sm text-gray-500', { hidden: !showDate })}>
            {formatDate(data.date, 'MM, dd yyyy')}
          </span>
        </div>
        <span
          className={cn(
            'text-sm text-gray-500 truncate block w-64 sm:w-[500px] md:w-[600px] font-openSans',
            {
              hidden: !showDescription,
            },
          )}
        >
          {data.description}
        </span>
      </div>
    </li>
  )
}

export default TransactionListItem
