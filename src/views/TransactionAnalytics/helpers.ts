import { chartColors } from './consts'

export const generateBgColor = () => {
  const _c: Record<string, string> = {}

  chartColors.forEach((c) => {
    _c[c] = c
  })

  return _c
}
