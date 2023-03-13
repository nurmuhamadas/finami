import MyButton from 'components/MyButton'
import { formatCurrencySign } from 'utils/helpers/formatter'

import { type CardHeaderProps } from './types'

const CardHeader = ({
  amount,
  label,
  disableButton,
  onButtonClick,
}: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm">{label}</span>
        <span className="text-lg font-semibold">
          {formatCurrencySign(amount)}
        </span>
      </div>
      <MyButton
        disabled={disableButton}
        onClick={onButtonClick}
        colorType="primary"
      >
        Detail
      </MyButton>
    </div>
  )
}

export default CardHeader
