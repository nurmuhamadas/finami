import { type CategoryGroupsType } from 'data/types'

import { type TransactionTypesType } from './types'

export const TRANSACTION_TYPES_OPT = [
  {
    value: 'in',
    label: 'Inflow',
  },
  {
    value: 'out',
    label: 'Outflow',
  },
]

export const CATEGORY_GROUP_OPT: Array<{
  value: CategoryGroupsType
  label: CategoryGroupsType
  type: TransactionTypesType
}> = [
  {
    value: 'Fun and Relax',
    label: 'Fun and Relax',
    type: 'out',
  },
  {
    value: 'Invensting and Debt Payment',
    label: 'Invensting and Debt Payment',
    type: 'out',
  },
  {
    value: 'Irregular Expense',
    label: 'Irregular Expense',
    type: 'out',
  },
  {
    value: 'Required Expense',
    label: 'Required Expense',
    type: 'out',
  },
  {
    value: 'Income',
    label: 'Income',
    type: 'in',
  },
]
