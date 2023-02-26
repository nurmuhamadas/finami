import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types'

export type MyDatePickerProps = {
  range?: boolean
  onChange: (date: Date[] | Date) => void
  showShorcut?: boolean
  showFooter?: boolean
  disabled?: boolean
  disabledDates?: DateRangeType[]
  displayFormat?: string
}
