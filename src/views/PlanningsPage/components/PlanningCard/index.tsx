import cn from 'classnames'

import { formatCurrency } from 'utils/helpers/formatter'

import { type PlanningCardProps } from './types'

const PlanningCard = ({ data, onClick }: PlanningCardProps) => {
  const diffAmount = (data.planning || 0) - (data.expense || 0)

  return (
    <li
      role={onClick ? 'button' : 'list'}
      key={data.id}
      className={cn('flex flex-col space-y-2', {
        'p-2 hover:bg-gray-100 rounded-lg': !!onClick,
      })}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">{data.category_name}</span>
        <span className="font-semibold">
          Rp. {formatCurrency(data.planning)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Expense</span>
        <span className={cn('text-sm')}>
          Rp. {formatCurrency(data.expense)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Budget remaining</span>
        <span
          className={cn('text-sm', {
            'text-finamiRed': diffAmount < 0,
          })}
        >
          Rp. {formatCurrency(diffAmount)}
        </span>
      </div>
    </li>
  )
}

export default PlanningCard
