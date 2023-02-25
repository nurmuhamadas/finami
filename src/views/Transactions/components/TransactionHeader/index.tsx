import { formatCurrency } from 'utils/helpers/formatter'
import { calcTotalTransaction } from 'utils/helpers/helper'

import { type TransactionHeaderProps } from './types'

const TransactionHeader = ({ data }: TransactionHeaderProps) => {
  const t = calcTotalTransaction(data)
  return (
    <div className="flex justify-between items-center">
      <span className="font-semibold">Total</span>
      <span className="font-semibold">
        {t.total < 0 ? '-' : ''} Rp. {formatCurrency(Math.abs(t.total))}
      </span>
    </div>
  )
}

export default TransactionHeader
