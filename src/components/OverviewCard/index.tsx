import Link from 'next/link'

import cn from 'classnames'
import { Card } from 'flowbite-react'

import { type OverviewCardProps } from './types'

const OverviewCard = ({
  title,
  children,
  Header,
  actionText,
  actionUrl,
  wrapperClassName,
  cardClassName,
}: OverviewCardProps) => {
  return (
    <div
      className={cn('flex w-full flex-col items-center', wrapperClassName, {
        'space-y-2': !!title && (!!actionText || !!actionUrl),
      })}
    >
      <div
        className={cn('flex w-full items-center justify-between px-2', {
          hidden: !title && (!actionText || !actionUrl),
        })}
      >
        <h3 className={cn('text-gray-500', { hidden: !title })}>{title}</h3>
        <Link href={actionUrl ?? '#'} legacyBehavior>
          <a
            className={cn('text-sm font-bold text-finamiBlue hover:underline', {
              hidden: !actionText || !actionUrl,
            })}
          >
            {actionText}
          </a>
        </Link>
      </div>

      <Card className={cn('w-full shadow-sm', cardClassName)}>
        {Boolean(Header) && <div className="border-b-2 pb-3">{Header}</div>}
        {children}
      </Card>
    </div>
  )
}

export default OverviewCard
