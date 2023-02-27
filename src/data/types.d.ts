export type TransactionTypesType = 'in' | 'out'
export type OrderTransactionType = 'asc' | 'desc'
export type SorterTransactionType = 'amount' | 'date'
export type CategoryGroupsType =
  | 'Required Expense'
  | 'Irregular Expense'
  | 'Invensting and Debt Payment'
  | 'Fun and Relax'
  | 'Income'
export type DateFormatsType =
  | 'yyyy/mm/dd'
  | 'dd/mm/yyyy'
  | 'mm/dd/yyyy'
  | 'yyyy/dd/mm'
  | 'yyyy-mm-dd'
  | 'dd-mm-yyyy'
  | 'mm-dd-yyyy'
  | 'yyyy-dd-mm'

// WALLETS
export interface WalletDataResponse {
  id: string
  name: string
  user_id: string
  user_name: string
  balance: number
  is_owner: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
export interface CreateWalletPayload {
  name: string
  balance: number
  user_id: string
}
export interface UpdateWalletPayload {
  name: string
  balance: number
}

// TRANSACTIONS
export interface TransactionDataResponse {
  id: string
  amount: number
  description: string
  date: Date
  transaction_type: TransactionTypesType
  image_url: string
  user_id: string
  user_name: string
  category_id: string
  category_name: string
  wallet_id: string
  wallet_name: string
  is_owner: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
export interface GetTransactionsQuery {
  child_id?: string
  transaction_type?: TransactionTypesType
  start_date: Date
  end_date: Date
  category_id?: string
  wallet_id?: string
  search_key?: string
  limit?: number
  offset?: number
  sort_by: SorterTransactionType
  order_by: OrderTransactionType
}
export interface CreateTransactionPayload {
  amount: number
  description: string
  date: Date
  transaction_type: TransactionTypesType
  image_url?: string
  category_id: string
  wallet_id: string
}
export interface UpdateTransactionPayload {
  amount: number
  description: string
  date: Date
  transaction_type: TransactionTypesType
  image_url?: string
  category_id: string
  wallet_id: string
}

// PLANNINGS
export interface PlanningDataResponse {
  id: string
  name: string
  amount: number
  category_id: string
  category_name: string
  user_id: string
  user_name: string
  wallet_id: string
  wallet_name: string
  month: Date
  is_owner: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
export interface GetPlanningsQuery {
  child_id?: string
  start_month?: Date
  end_month?: Date
  wallet_id?: string
}
export interface CreatePlanningPayload {
  name: string
  amount: number
  month: Date
  category_id: string
  wallet_id: string
}
export interface UpdatePlanningPayload {
  name: string
  amount: number
  category_id: string
  wallet_id: string
}

// CATEGORIES
export interface CategoryDataResponse {
  id: string
  name: string
  transaction_type: TransactionTypesType
  icon_url: string
  group: CategoryGroupsType
  user_id: string
  user_name: string
  is_owner: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
export interface GetCategoriesQuery {
  transaction_type?: TransactionTypesType
}
export interface CreateCategoryPayload {
  name: string
  transaction_type: TransactionTypesType
  icon_url?: string
  group: CategoryGroupsType
}
export interface UpdateCategoryPayload {
  name: string
  transaction_type: TransactionTypesType
  icon_url?: string
  group: CategoryGroupsType
}

// USERS
export interface UserDataResponse {
  id: string
  username: string
  email: string
  fullname: string
  parent_id: string
  image_url: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
export interface CreateUserPayload {
  username: string
  email: string
  password: string
  fullname: string
  parent_id?: string
  image_url?: string
}
export interface UpdateUserPayload {
  username: string
  password: string
  fullname: string
  image_url?: string
}

// SETTINGS
export interface SettingDataResponse {
  id: string
  user_id: string
  currency_id: string
  date_format: DateFormatsType
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
export interface CreateSettingPayload {
  currency_id: string
  date_format: DateFormatType
}
export interface UpdateSettingPayload {
  currency_id: string
  date_format: DateFormatType
}