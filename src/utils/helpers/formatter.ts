import { type Dayjs } from 'dayjs'

import { type DateFormatTypes } from 'utils/constants/types'

export function parseNumber(v: number, toFixed = 0) {
  const parsed = parseFloat(String(v))
  /**
   * Validate & Convert `-0` or `-0.00` to `0`
   */
  const positifNum = Math.abs(parsed)
  let fixedNum: string | number =
    Number.isFinite(parsed) && positifNum !== 0 ? parsed : 0

  if (Number.isFinite(toFixed) && Math.ceil(toFixed) >= 0) {
    fixedNum = fixedNum.toFixed(toFixed)
  }

  return parseFloat(`${fixedNum}`)
}

export const formatCurrency = (number: number, toFixed?: number) => {
  return new Intl.NumberFormat('ja-JP').format(parseNumber(number, toFixed))
}

const numberToMonth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const formatDate = (
  date: Date | string,
  format: DateFormatTypes = 'dd-mm-yyyy',
) => {
  const _d = new Date(date)
  const d = _d.getDate()
  const m = _d.getMonth()
  const M = numberToMonth[m]
  const y = _d.getFullYear()

  const _date = format
    .replace('dd', d.toString())
    .replace('mm', m.toString())
    .replace('MM', M)
    .replace('yyyy', y.toString())

  return _date
}

export const dayjsToDate = (date: Dayjs): Date => {
  return new Date(date.format('YYYY-MM-DD'))
}

export const formatCurrencySign = (amount: number, sign = 'Rp. ') => {
  const _isPositive = amount >= 0

  return `${_isPositive ? '' : '-'}${sign} ${formatCurrency(amount)}`
}
