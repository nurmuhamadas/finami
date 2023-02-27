import React, { useEffect, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { type DateRangeType } from 'react-tailwindcss-datepicker/dist/types'

import { type MyDatePickerProps } from './types'

const MyDatePicker = ({
  onChange,
  range = false,
  showShorcut = false,
  showFooter = false,
  disabled = false,
  displayFormat = 'DD-MM-YYYY',
  disabledDates,
  initialValue,
}: MyDatePickerProps) => {
  const [value, setValue] = useState<DateRangeType>()

  const handleChange = (v: DateRangeType) => {
    const start = v?.startDate ? new Date(v.startDate) : undefined
    const end = v.endDate ? new Date(v.endDate) : undefined
    setValue(v)

    if (range) {
      onChange([start, end])
    } else {
      onChange(start)
    }
  }

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue)
    }
  }, [])

  return (
    <Datepicker
      disabled={disabled}
      value={value}
      onChange={handleChange}
      asSingle={!range}
      useRange={range}
      showFooter={showFooter}
      showShortcuts={showShorcut}
      primaryColor="violet"
      placeholder="Select date"
      displayFormat={displayFormat}
      inputClassName="py-[8px]"
      disabledDates={disabledDates}
    />
  )
}

export default MyDatePicker
