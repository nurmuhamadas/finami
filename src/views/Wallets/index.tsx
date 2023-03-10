import { useMemo, useState } from 'react'
import Select from 'react-tailwindcss-select'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import dynamic from 'next/dynamic'

import cn from 'classnames'
import dayjs from 'dayjs'
import { Alert } from 'flowbite-react'

import useGetTransactions from 'data/api/Transactions/useGetTransactions'
import useGetUsers from 'data/api/Users/useGetUsers'
import useGetWallets from 'data/api/Wallets/useGetWallets'
import deleteWalletMutation from 'data/mutations/wallets/deleteWalletMutation'
import postWalletMutation from 'data/mutations/wallets/postWalletMutation'
import putWalletMutation from 'data/mutations/wallets/putWalletMutation'
import { type CreateWalletPayload, type WalletDataResponse } from 'data/types'

import AppLayout from 'components/AppLayout'
import Loader from 'components/Loader'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import { formatCurrencySign } from 'utils/helpers/formatter'
import {
  groupWalletsByUser,
  mapDataToSelectOptions,
} from 'utils/helpers/helper'

import WalletsCard from './components/WalletsCard'

const MyModal = dynamic(async () => await import('components/MyModal'))
const WalletModal = dynamic(
  async () => await import('./components/WalletModal'),
)

const WalletsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [selectedWallet, setSelectedWallet] =
    useState<WalletDataResponse | null>(null)
  const [selectedUser, setSelectedUser] = useState<Option>()
  const [errorMessage, setErrorMessage] = useState(undefined)

  const createMutation = postWalletMutation()
  const updateMutation = putWalletMutation()
  const deleteMutation = deleteWalletMutation()

  const { data: users } = useGetUsers()
  const userOpt = mapDataToSelectOptions(users || [], 'id', 'fullname')

  const { data: trxData, isLoading: trxLoading } = useGetTransactions({
    start_date: dayjs().startOf('month').toDate(),
    end_date: dayjs().endOf('month').toDate(),
  })
  const thisMonthExpense = useMemo(() => {
    if (trxData) {
      return trxData?.map((d) => d.amount).reduce((a, b) => a + b, 0)
    }
    return 0
  }, [trxData])

  const {
    data: walletsData,
    isLoading,
    refetch,
  } = useGetWallets({
    user_id: selectedUser?.value || null,
  })
  const groupedWallet = useMemo(() => {
    return groupWalletsByUser(walletsData)
  }, [walletsData])
  const lastMonth = groupedWallet?.total - thisMonthExpense

  const resetState = () => {
    setSelectedWallet(undefined)
    setErrorMessage(undefined)
  }

  const handleSave = async (values: CreateWalletPayload) => {
    try {
      setErrorMessage(undefined)

      if (selectedWallet) {
        await updateMutation.mutateAsync({
          id: selectedWallet?.id,
          payload: {
            name: values.name,
            balance: values.balance,
          },
        })
      } else {
        await createMutation.mutateAsync(values)
      }
      await refetch()

      setIsModalOpen(false)
      resetState()
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  const handleDelete = async () => {
    try {
      setErrorMessage(undefined)

      if (selectedWallet?.is_owner) {
        await deleteMutation.mutateAsync(selectedWallet?.id)
        await refetch()
      }

      setIsOpenDeleteModal(false)
      resetState()
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  return (
    <AppLayout description="Manage your family wallets">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col ">
          <OverviewCard
            cardClassName="bg-gradient-to-r from-finamiBlueSecondary to-finamiBlue"
            wrapperClassName="md:max-w-md"
          >
            <div className="flex flex-col space-y-4">
              <h3 className="block text-white">Balance</h3>
              <div className=" mb-3 flex items-center space-x-4">
                <p className="text-3xl font-bold text-white">
                  {trxLoading
                    ? 'Loading...'
                    : formatCurrencySign(groupedWallet.total)}
                </p>
                <span className="text-white">
                  {thisMonthExpense < 0 ? '-' : '+'}
                  {(thisMonthExpense / (lastMonth || 1)) * 100}%
                </span>
              </div>
              <span className="text-sm text-white">
                Compared to last month (
                {formatCurrencySign(groupedWallet.total - thisMonthExpense)})
              </span>
            </div>
          </OverviewCard>
        </div>

        <div className="flex justify-between sm:items-center space-x-4 flex-col-reverse sm:flex-row">
          <div className="flex items-center space-x-2 w-full mt-4 sm:w-80 sm:mt-0;">
            <Select
              isSearchable
              isClearable
              primaryColor="violet"
              value={selectedUser}
              onChange={(e: Option | Option[]) => {
                if (e) {
                  setSelectedUser(e as Option)
                } else {
                  setSelectedUser(undefined)
                }
              }}
              options={userOpt}
            />
          </div>
          <div className="flex justify-end items-center space-x-2">
            <MyButton
              colorType="primary"
              onClick={() => {
                setIsModalOpen(true)
              }}
            >
              Add Wallet
            </MyButton>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          {isLoading && <Loader />}

          {groupedWallet?.data?.map((d) => (
            <OverviewCard
              title={d.is_owner ? 'My Wallets' : d.user_fullname}
              key={JSON.stringify(d)}
            >
              <WalletsCard
                wallets={d}
                onDeleteClick={(_data) => {
                  setSelectedWallet(_data)
                  setIsOpenDeleteModal(true)
                }}
                onEditClick={(_data) => {
                  setSelectedWallet(_data)
                  setIsModalOpen(true)
                }}
              />
            </OverviewCard>
          ))}
        </div>

        <WalletModal
          initialData={{
            name: selectedWallet?.name,
            balance: selectedWallet?.balance,
            user_id:
              selectedWallet?.user_id || selectedUser?.value || undefined,
          }}
          isOpen={isModalOpen}
          isEditData={!!selectedWallet}
          onClose={() => {
            resetState()
            setIsModalOpen(false)
          }}
          onSave={(data) => {
            void (async () => {
              await handleSave(data)
            })()
          }}
          onFormChange={() => {
            setErrorMessage(undefined)
          }}
          isSubmitting={createMutation.isLoading}
          errorMessage={errorMessage}
        />

        <MyModal
          show={isOpenDeleteModal}
          onClose={() => {
            resetState()
            setIsOpenDeleteModal(false)
          }}
          position="top-center"
          header="Delete confirmation"
          footer={
            <div className="flex w-full justify-end">
              <MyButton colorType="danger" onClick={handleDelete}>
                Delete
              </MyButton>
            </div>
          }
        >
          <Alert
            color="failure"
            className={cn('mb-4', { hidden: !errorMessage })}
            onDismiss={() => {
              setErrorMessage(undefined)
            }}
          >
            {errorMessage}
          </Alert>
          <p>
            All transaction related to{' '}
            <span className="font-semibold">{selectedWallet?.name}</span> wallet
            will be deleted. Are you sure?
          </p>
        </MyModal>
      </div>
    </AppLayout>
  )
}

export default WalletsPage
