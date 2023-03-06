import { useState } from 'react'
import Select from 'react-tailwindcss-select'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import dynamic from 'next/dynamic'

import useGetUsers from 'data/api/Users/useGetUsers'
import useGetWallets from 'data/api/Wallets/useGetWallets'
import { type WalletDataResponse } from 'data/types'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import { formatCurrencySign } from 'utils/helpers/formatter'
import {
  groupWalletsByUser,
  mapDataToSelectOptions,
} from 'utils/helpers/helper'

import { type WalletFormData } from './components/WalletModal/types'
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

  const users = useGetUsers()
  const userOpt = mapDataToSelectOptions(users, 'id', 'fullname')

  const walletsData = useGetWallets({ user_id: selectedUser?.value || null })
  const groupedWallet = groupWalletsByUser(walletsData)

  const handleSave = async (values: WalletFormData) => {
    console.log(values, selectedWallet)
  }

  const handleDelete = () => {
    console.log('delete')
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
                  {formatCurrencySign(groupedWallet.total)}
                </p>
                <span className="text-white">+20%</span>
              </div>
              <span className="text-sm text-white">
                Compared to last month (Rp100,000)
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
            setSelectedWallet(null)
            setIsModalOpen(false)
          }}
          onSave={(data) => {
            void (async () => {
              await handleSave(data)
            })()
          }}
        />

        <MyModal
          show={isOpenDeleteModal}
          onClose={() => {
            setSelectedWallet(null)
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
          <p>
            All transaction related to {selectedWallet?.name} wallet will be
            deleted. Are you sure?
          </p>
        </MyModal>
      </div>
    </AppLayout>
  )
}

export default WalletsPage
