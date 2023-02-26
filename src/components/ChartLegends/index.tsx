import cn from 'classnames'

import { type ChartLegendsProps } from './types'

const ChartLegends = ({
  legends,
  wrapperClassName,
  labelClassName,
}: ChartLegendsProps) => {
  return (
    <div className={cn('mb-6 flex items-center space-x-6', wrapperClassName)}>
      {legends.map((d) => {
        return (
          <div key={d.label} className="flex items-center">
            <div
              className={cn('mr-2 block h-4 w-4 bg-finamiBlue', d.color)}
            ></div>
            <span className={cn(labelClassName)}>{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default ChartLegends
