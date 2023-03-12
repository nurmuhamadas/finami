import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineWallet,
} from 'react-icons/ai'

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
  showWallet,
  walletClassname,
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
        <div
          className={cn('flex items-center w-full justify-between flex-wrap', {
            'gap-2': showUser && showDate,
          })}
        >
          <div
            className={cn('flex items-center flex-wrap gap-2', {
              hidden: !showUser,
            })}
          >
            <AiOutlineUser className="text-finamiBlue" />
            <span className={cn('text-sm text-gray-500')}>
              By: {data.user_fullname}
            </span>
          </div>
          <div
            className={cn('flex items-center flex-wrap gap-2', {
              hidden: !showDate,
            })}
          >
            <AiOutlineCalendar className="text-finamiBlue" />
            <span
              className={cn('text-sm text-gray-500', { hidden: !showDate })}
            >
              {formatDate(data.date, 'MM, dd yyyy')}
            </span>
          </div>
        </div>
        <div
          className={cn('flex items-center w-full flex-wrap gap-2', {
            hidden: !showWallet,
          })}
        >
          <AiOutlineWallet className="text-finamiBlue" />
          <span
            className={cn(
              'text-sm text-gray-500 truncate block w-52 sm:w-[500px] md:w-[600px] font-openSans',
              walletClassname,
            )}
          >
            {data.wallet_name}
          </span>
        </div>
      </div>
    </li>
  )
}

export default TransactionListItem
