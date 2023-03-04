import cn from 'classnames'

import { formatCurrency, formatCurrencySign } from 'utils/helpers/formatter'

import { type PlanningCardProps } from './types'

const PlanningCard = ({
  planning,
  expense,
  showExpense,
  wrapperClassName,
  onClick,
}: PlanningCardProps) => {
  const diffAmount = (planning.amount || 0) - (expense || 0)

  return (
    <li
      role={onClick ? 'button' : 'list'}
      key={planning.id}
      className={cn('flex flex-col space-y-2', wrapperClassName, {
        'p-2 hover:bg-gray-100 rounded-lg': !!onClick,
      })}
      onClick={() => {
        if (onClick) onClick(planning)
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">
          {planning.name} {!showExpense ? `- ${planning.category_name}` : ''}
        </span>
        <span className="font-semibold">
          Rp. {formatCurrency(planning.amount)}
        </span>
      </div>
      <div
        className={cn('flex items-center justify-between', {
          hidden: showExpense,
        })}
      >
        <span className={cn('text-sm')}>{planning.category_name}</span>
        <span className="text-sm"></span>
      </div>
      <div
        className={cn('flex items-center justify-between', {
          hidden: !showExpense,
        })}
      >
        <span className="text-sm">Expense</span>
        <span className={cn('text-sm')}>Rp. {formatCurrency(expense)}</span>
      </div>
      <div
        className={cn('flex items-center justify-between', {
          hidden: !showExpense,
        })}
      >
        <span className="text-sm">Budget remaining</span>
        <span
          className={cn('text-sm', {
            'text-finamiRed': diffAmount < 0,
          })}
        >
          {formatCurrencySign(diffAmount)}
        </span>
      </div>
    </li>
  )
}

export default PlanningCard
