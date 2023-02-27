import { formatCurrency } from 'utils/helpers/formatter'

import { type TransactionHeaderProps } from './types'

const TransactionHeader = ({ total }: TransactionHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className="font-semibold">Total</span>
      <span className="font-semibold">
        {total < 0 ? '-' : ''} Rp. {formatCurrency(Math.abs(total))}
      </span>
    </div>
  )
}

export default TransactionHeader
