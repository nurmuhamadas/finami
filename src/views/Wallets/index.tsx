import { useState } from 'react'

import dynamic from 'next/dynamic'

import { Modal } from 'flowbite-react'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'

import WalletModal from './components/WalletModal'
import { type WalletDataType } from './components/WalletModal/types'
import WalletsCard from './components/WalletsCard'

const MyModal = dynamic(async () => await import('components/MyModal'))

const WalletsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<WalletDataType | null>(
    null,
  )

  const handleSave = async (values: WalletDataType) => {
    console.log(values)
  }

  const handleDelete = () => {
    console.log('delete')
  }

  return (
    <AppLayout title="Wallets" description="Manage your family wallets">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col ">
          <OverviewCard
            cardClassName="bg-gradient-to-r from-finamiBlueSecondary to-finamiBlue"
            wrapperClassName="md:max-w-md"
          >
            <div className="flex flex-col space-y-4">
              <h3 className="block text-white">Balance</h3>
              <div className=" mb-3 flex items-center space-x-4">
                <p className="text-3xl font-bold text-white">Rp120,000</p>
                <span className="text-white">+20%</span>
              </div>
              <span className="text-sm text-white">
                Compared to last month (Rp100,000)
              </span>
            </div>
          </OverviewCard>
        </div>

        <div className="flex justify-end">
          <MyButton
            colorType="primary"
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Add Wallet
          </MyButton>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          <OverviewCard title="My Wallets">
            <WalletsCard
              data={[
                {
                  id: '1',
                  name: 'Wallet 1',
                  balance: 2000000,
                  user_id: '',
                },
                {
                  id: '2',
                  name: 'Wallet 2',
                  balance: 1220000,
                  user_id: '',
                },
              ]}
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

          <OverviewCard title="Child 1 wallets">
            <WalletsCard
              data={[
                {
                  id: '1',
                  name: 'Wallet 1',
                  balance: 2000000,
                  user_id: '',
                },
                {
                  id: '2',
                  name: 'Wallet 2',
                  balance: 1220000,
                  user_id: '',
                },
              ]}
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
          <OverviewCard title="Child 1 wallets">
            <WalletsCard
              data={[
                {
                  id: '1',
                  name: 'Wallet 1',
                  balance: 2000000,
                  user_id: '',
                },
                {
                  id: '2',
                  name: 'Wallet 2',
                  balance: 1220000,
                  user_id: '',
                },
              ]}
              onEditClick={(_data) => {
                setSelectedWallet(_data)
                setIsModalOpen(true)
              }}
              onDeleteClick={(_data) => {
                setSelectedWallet(_data)
                setIsOpenDeleteModal(true)
              }}
            />
          </OverviewCard>
        </div>

        <WalletModal
          initialData={selectedWallet}
          isOpen={isModalOpen}
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
          position="bottom-center"
        >
          <Modal.Header>Delete confirmation</Modal.Header>
          <Modal.Body>
            <p>
              All transaction related to {selectedWallet?.name} wallet will be
              deleted. Are you sure?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full justify-end">
              <MyButton colorType="danger" onClick={handleDelete}>
                Delete
              </MyButton>
            </div>
          </Modal.Footer>
        </MyModal>
      </div>
    </AppLayout>
  )
}

export default WalletsPage
