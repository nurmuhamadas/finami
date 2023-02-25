export type MyDatePickerProps = {
  range?: boolean
  onChange: (date: Date[] | Date) => void
  showShorcut?: boolean
  showFooter?: boolean
  disabled?: boolean
}
