import { type AxiosInstance } from 'axios'

import {
  type CategoryDataResponse,
  type CreateCategoryPayload,
  type CreateMemberPayload,
  type CreatePlanningPayload,
  type CreateSettingPayload,
  type CreateTransactionPayload,
  type CreateUserPayload,
  type CreateWalletPayload,
  type DeleteSuccessResponse,
  type GetCategoriesQuery,
  type GetPlanningsQuery,
  type GetTransactionsQuery,
  type GetUsersQuery,
  type GetWalletsQuery,
  type LoginPayload,
  type LoginSuccessResponse,
  type LogoutPayload,
  type LogoutSuccessResponse,
  type PlanningDataResponse,
  type PostSuccessResponse,
  type PutSuccessResponse,
  type RefreshTokenPayload,
  type RefreshTokenSuccessResponse,
  type SettingDataResponse,
  type TransactionDataResponse,
  type UpdateCategoryPayload,
  type UpdatePlanningPayload,
  type UpdateSettingPayload,
  type UpdateTransactionPayload,
  type UpdateUserPayload,
  type UpdateWalletPayload,
  type UserDataResponse,
  type WalletDataResponse,
} from 'data/types'

import { API_ENDPOINT } from 'utils/constants/api'
import { urlQueryGenerator } from 'utils/helpers/helper'

import Fetcher from './fetcher'

interface Result<T> {
  status: string
  data: T
}

class BaseApiCall {
  public api: AxiosInstance

  constructor() {
    this.api = Fetcher.createAuthAxios('http://localhost:3333/api')
  }

  Categories = {
    getCategories: async (
      query: GetCategoriesQuery,
    ): Promise<Result<CategoryDataResponse[]>> => {
      return await this.api.get(
        urlQueryGenerator(API_ENDPOINT.categories, query),
      )
    },
    getCategoryById: async (
      id: string,
    ): Promise<Result<CategoryDataResponse>> => {
      return await this.api.get(`${API_ENDPOINT.categories}/${id}`)
    },
    postCategory: async (
      payload: CreateCategoryPayload,
    ): Promise<PostSuccessResponse> => {
      return await this.api.post(`${API_ENDPOINT.categories}`, payload)
    },
    putCategory: async (
      id: string,
      payload: UpdateCategoryPayload,
    ): Promise<PutSuccessResponse> => {
      return await this.api.put(`${API_ENDPOINT.categories}/${id}`, payload)
    },
    deleteCategoryById: async (id: string): Promise<DeleteSuccessResponse> => {
      return await this.api.delete(`${API_ENDPOINT.categories}/${id}`)
    },
  }

  Users = {
    getUsers: async (
      query: GetUsersQuery,
    ): Promise<Result<UserDataResponse[]>> => {
      return await this.api.get(
        urlQueryGenerator(API_ENDPOINT.user_members, query),
      )
    },
    getUserById: async (id: string): Promise<Result<UserDataResponse>> => {
      return await this.api.get(`${API_ENDPOINT.users}/${id}`)
    },
    postUser: async (
      payload: CreateUserPayload,
    ): Promise<PostSuccessResponse> => {
      return await this.api.post(`${API_ENDPOINT.users}`, payload)
    },
    putUser: async (
      id: string,
      payload: UpdateUserPayload,
    ): Promise<PutSuccessResponse> => {
      return await this.api.put(`${API_ENDPOINT.users}/${id}`, payload)
    },
    deleteUserById: async (id: string): Promise<DeleteSuccessResponse> => {
      return await this.api.delete(`${API_ENDPOINT.user_members}/${id}`)
    },
    postMember: async (
      payload: CreateMemberPayload,
    ): Promise<PostSuccessResponse> => {
      return await this.api.post(`${API_ENDPOINT.user_members}`, payload)
    },
  }

  Wallets = {
    getWallets: async (
      query: GetWalletsQuery,
    ): Promise<Result<WalletDataResponse[]>> => {
      return await this.api.get(urlQueryGenerator(API_ENDPOINT.wallets, query))
    },
    getWalletById: async (id: string): Promise<Result<WalletDataResponse>> => {
      return await this.api.get(`${API_ENDPOINT.wallets}/${id}`)
    },
    postWallet: async (
      payload: CreateWalletPayload,
    ): Promise<PostSuccessResponse> => {
      return await this.api.post(`${API_ENDPOINT.wallets}`, payload)
    },
    putWallet: async (
      id: string,
      payload: UpdateWalletPayload,
    ): Promise<PutSuccessResponse> => {
      return await this.api.put(`${API_ENDPOINT.wallets}/${id}`, payload)
    },
    deleteWalletById: async (id: string): Promise<DeleteSuccessResponse> => {
      return await this.api.delete(`${API_ENDPOINT.wallets}/${id}`)
    },
  }

  Settings = {
    getSetting: async (id: string): Promise<Result<SettingDataResponse>> => {
      return await this.api.get(`${API_ENDPOINT.settings}/${id}`)
    },
    postSetting: async (
      payload: CreateSettingPayload,
    ): Promise<PostSuccessResponse> => {
      return await this.api.post(`${API_ENDPOINT.settings}`, payload)
    },
    putSetting: async (
      id: string,
      payload: UpdateSettingPayload,
    ): Promise<PutSuccessResponse> => {
      return await this.api.put(`${API_ENDPOINT.settings}/${id}`, payload)
    },
  }

  Plannings = {
    getPlannings: async (
      query: GetPlanningsQuery,
    ): Promise<Result<PlanningDataResponse[]>> => {
      return await this.api.get(
        urlQueryGenerator(API_ENDPOINT.plannings, query),
      )
    },
    getPlanningById: async (
      id: string,
    ): Promise<Result<PlanningDataResponse>> => {
      return await this.api.get(`${API_ENDPOINT.plannings}/${id}`)
    },
    postPlanning: async (
      payload: CreatePlanningPayload,
    ): Promise<PostSuccessResponse> => {
      return await this.api.post(`${API_ENDPOINT.plannings}`, payload)
    },
    putPlanning: async (
      id: string,
      payload: UpdatePlanningPayload,
    ): Promise<PutSuccessResponse> => {
      return await this.api.put(`${API_ENDPOINT.plannings}/${id}`, payload)
    },
    deletePlanningById: async (id: string): Promise<DeleteSuccessResponse> => {
      return await this.api.delete(`${API_ENDPOINT.plannings}/${id}`)
    },
  }

  Transactions = {
    getTransactions: async (
      query: GetTransactionsQuery,
    ): Promise<Result<TransactionDataResponse[]>> => {
      return await this.api.get(
        urlQueryGenerator(API_ENDPOINT.transactions, query),
      )
    },
    getTransactionById: async (
      id: string,
    ): Promise<Result<TransactionDataResponse>> => {
      return await this.api.get(`${API_ENDPOINT.transactions}/${id}`)
    },
    postTransaction: async (
      payload: CreateTransactionPayload,
    ): Promise<PostSuccessResponse> => {
      return await this.api.post(`${API_ENDPOINT.transactions}`, payload)
    },
    putTransaction: async (
      id: string,
      payload: UpdateTransactionPayload,
    ): Promise<PutSuccessResponse> => {
      return await this.api.put(`${API_ENDPOINT.transactions}/${id}`, payload)
    },
    deleteTransactionById: async (
      id: string,
    ): Promise<DeleteSuccessResponse> => {
      return await this.api.delete(`${API_ENDPOINT.transactions}/${id}`)
    },
  }

  Auth = {
    login: async (payload: LoginPayload): Promise<LoginSuccessResponse> => {
      return await this.api.post(`${API_ENDPOINT.authentications}`, payload)
    },
    refreshToken: async (
      payload: RefreshTokenPayload,
    ): Promise<RefreshTokenSuccessResponse> => {
      return await this.api.put(`${API_ENDPOINT.authentications}`, payload)
    },
    logout: async (payload: LogoutPayload): Promise<LogoutSuccessResponse> => {
      return await this.api.delete(`${API_ENDPOINT.authentications}`, {
        data: payload,
      })
    },
  }
}

const ApiCall = new BaseApiCall()

export default ApiCall
