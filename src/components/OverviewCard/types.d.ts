import { ElementType, ReactElement } from 'react'

export type OverviewCardProps = {
  actionText?: string
  actionUrl?: string
  title?: string
  Header?: ReactElement
  children: ReactElement
  wrapperClassName?: string
  cardClassName?: string
  onCardClick?: () => void
}
