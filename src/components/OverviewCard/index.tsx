import { Fragment } from 'react'

import Link from 'next/link'

import cn from 'classnames'
import { Card, Spinner } from 'flowbite-react'

import { type OverviewCardProps } from './types'

const OverviewCard = ({
  title,
  children,
  Header,
  actionText,
  actionUrl,
  wrapperClassName,
  cardClassName,
  onCardClick,
  loading = false,
}: OverviewCardProps) => {
  return (
    <div
      className={cn('flex w-full flex-col items-center', wrapperClassName, {
        'space-y-2': !!title || (!!actionText && !!actionUrl),
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

      <Card
        role={onCardClick ? 'button' : undefined}
        onClick={onCardClick}
        className={cn('w-full shadow-sm', cardClassName)}
      >
        {!loading ? (
          <Fragment>
            {Boolean(Header) && <div className="border-b-2 pb-3">{Header}</div>}
            {children}
          </Fragment>
        ) : (
          <div className="w-full flex justify-center items-center h-10">
            <Spinner color="purple" size="lg" />
          </div>
        )}
      </Card>
    </div>
  )
}

export default OverviewCard
