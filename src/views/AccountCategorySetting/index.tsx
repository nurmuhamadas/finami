import { useState } from 'react'
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFile,
  AiOutlinePlus,
} from 'react-icons/ai'

import useGetCategories from 'data/api/Categories/useGetCategories'
import {
  type CategoryDataResponse,
  type CreateCategoryPayload,
} from 'data/types'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import { groupCategoriesByGroup } from 'utils/helpers/helper'

import ModalRegisterCategory from './components/ModalRegisterCategory'

const AccountCategorySetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDataResponse>(undefined)

  const data = useGetCategories()
  const grouppedData = groupCategoriesByGroup(data)

  const handleRegister = (values: CreateCategoryPayload) => {
    console.log(values, isDeleteOpen)
  }

  return (
    <AppLayout description="Manage your categories">
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

        {grouppedData?.map((d) => (
          <OverviewCard
            key={d.group}
            Header={<h3 className="text-lg font-semibold">{d.group}</h3>}
          >
            <ul className="">
              {d.data?.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-wrap py-4 gap-4 items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-600 mb-1 w-[275px] truncate">
                      {c.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2 h-max ml-auto">
                    <MyButton
                      color="light"
                      onClick={() => {
                        setSelectedCategory(c)
                        setIsModalOpen(true)
                      }}
                    >
                      <AiOutlineEdit size={16} />
                    </MyButton>
                    <MyButton
                      colorType="danger"
                      onClick={() => {
                        setIsDeleteOpen(true)
                      }}
                    >
                      <AiOutlineDelete size={16} />
                    </MyButton>
                  </div>
                </li>
              ))}

              {d.data?.length <= 0 && (
                <li className="w-full items-center justify-center py-12">
                  <div className="mx-auto w-max flex flex-col items-center text-gray-500">
                    <AiOutlineFile size={32} />
                    <span className="mt-2">No list</span>
                  </div>
                </li>
              )}
            </ul>
          </OverviewCard>
        ))}

        <ModalRegisterCategory
          show={isModalOpen}
          onClose={() => {
            setSelectedCategory(undefined)
            setIsModalOpen(false)
          }}
          onSubmit={handleRegister}
          initialData={selectedCategory}
        />
      </div>
    </AppLayout>
  )
}

export default AccountCategorySetting
