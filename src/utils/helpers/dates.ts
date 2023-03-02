import dayjs from 'dayjs'

interface OptionsType {
  dateFormat?: string
}

export const getStartEndDateOfWeeks = (
  startDate: Date,
  endDate: Date,
  { dateFormat }: OptionsType = { dateFormat: 'YYYY-MM-DD' },
) => {
  const s = dayjs(startDate)
  const e = dayjs(endDate)
  const res = []

  if (s.isAfter(e)) {
    return [['Start date should before end date']]
  }

  let d = s
  while (!d.startOf('week').isAfter(e)) {
    const sow = d.startOf('week')
    const eow = d.endOf('week')
    const _res = []

    //  start date
    if (sow.isBefore(s)) _res.push(s.format(dateFormat))
    else _res.push(sow.format(dateFormat))

    //  end date
    if (eow.isAfter(e)) _res.push(e.format(dateFormat))
    else _res.push(eow.format(dateFormat))

    res.push(_res)
    d = d.add(7, 'day')
  }

  return res
}
