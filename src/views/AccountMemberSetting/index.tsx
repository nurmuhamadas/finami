import { useState } from 'react'
import { AiOutlineDelete, AiOutlineFile, AiOutlinePlus } from 'react-icons/ai'

import dynamic from 'next/dynamic'

import useGetUsers from 'data/api/Users/useGetUsers'
import { type CreateUserPayload, type UserDataResponse } from 'data/types'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'

const MyModal = dynamic(async () => await import('components/MyModal'))
const ModalRegisterMember = dynamic(
  async () => await import('./components/ModalRegisterMember'),
)

const AccountMemberSetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDataResponse>(undefined)

  const data = useGetUsers()?.data?.filter((d) => !!d.parent_id)

  const handleRegister = (values: CreateUserPayload) => {
    console.log(values)
  }

  const handleDelete = () => {
    console.log(selectedUser)
  }

  return (
    <AppLayout description="Manage your members">
      <div className="flex flex-col space-y-8 max-w-3xl w-full">
        <div className="flex items-center space-x-3 justify-between">
          <div />
          <div className="flex items-center justify-end">
            <MyButton
              colorType="primary"
              onClick={() => {
                setIsModalOpen(true)
              }}
            >
              <AiOutlinePlus />
            </MyButton>
          </div>
        </div>

        <OverviewCard
          Header={<h3 className="text-lg font-semibold">List Member</h3>}
        >
          <ul className="">
            {data?.map((d) => (
              <li
                key={d.id}
                className="flex flex-col py-4 gap-4 justify-between sm:flex-row"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 mb-1 w-full sm:w-[400px] truncate">
                    {d.fullname}
                  </span>
                  <span className="text-sm text-gray-500 w-full sm:w-[400px] truncate">
                    {d.username} - {d.email}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2 h-max">
                  <MyButton
                    colorType="danger"
                    onClick={() => {
                      setSelectedUser(d)
                      setIsDeleteOpen(true)
                    }}
                  >
                    <AiOutlineDelete size={16} />
                  </MyButton>
                </div>
              </li>
            ))}

            {data?.length <= 0 && (
              <li className="w-full items-center justify-center py-12">
                <div className="mx-auto w-max flex flex-col items-center text-gray-500">
                  <AiOutlineFile size={32} />
                  <span className="mt-2">No list</span>
                </div>
              </li>
            )}
          </ul>
        </OverviewCard>

        <ModalRegisterMember
          show={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          onSubmit={handleRegister}
        />

        <MyModal
          show={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false)
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
            All related data to the {selectedUser?.fullname} user will be
            deleted. Are you sure?
          </p>
        </MyModal>
      </div>
    </AppLayout>
  )
}

export default AccountMemberSetting
