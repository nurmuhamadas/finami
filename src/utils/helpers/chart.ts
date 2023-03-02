type ChartDataType = Array<Array<string | number>>

interface Options<T> {
  xAxisLabel: string
  legendLabels: string[]
  yAxisKey: Array<keyof T>
  xAxisKey: keyof T
}
export function formatDataToBarChart<T>(
  data: T[],
  options: Options<T>,
): ChartDataType {
  const { xAxisLabel, legendLabels, yAxisKey, xAxisKey } = options
  const _d: ChartDataType = [[xAxisLabel, ...legendLabels]]
  data.forEach((d) => {
    const y = yAxisKey.map((_key) => d[_key])
    _d.push([d[xAxisKey] as string, ...(y as number[])])
  })

  return _d
}
