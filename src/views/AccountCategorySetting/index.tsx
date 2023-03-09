import { useMemo, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import Select from 'react-tailwindcss-select'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import Image from 'next/image'

import useGetCategories from 'data/api/Categories/useGetCategories'
import {
  type CategoryDataResponse,
  type CreateCategoryPayload,
} from 'data/types'

import AppLayout from 'components/AppLayout'
import EmptyList from 'components/EmptyList'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import { TRANSACTION_TYPES_OPT } from 'utils/constants/common'
import { type TransactionTypesType } from 'utils/constants/types'
import { groupCategoriesByGroup } from 'utils/helpers/helper'

import ModalRegisterCategory from './components/ModalRegisterCategory'

const AccountCategorySetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<Option>(undefined)

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDataResponse>(undefined)

  const { data } = useGetCategories({
    transaction_type: transactionType?.value as TransactionTypesType,
  })
  const grouppedData = useMemo(() => {
    if (data?.length > 0) {
      return groupCategoriesByGroup(data)
    }

    return []
  }, [data])

  const handleRegister = (values: CreateCategoryPayload) => {
    console.log(values, isDeleteOpen)
  }

  return (
    <AppLayout description="Manage your categories">
      <div className="flex flex-col space-y-8 max-w-3xl w-full">
        <div className="flex items-center space-x-3 justify-between">
          <div className="flex w-64">
            <Select
              isClearable
              primaryColor="violet"
              placeholder="Select"
              value={transactionType}
              onChange={(val) => {
                setTransactionType(val as Option)
              }}
              options={TRANSACTION_TYPES_OPT}
            />
          </div>
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
                  <div className="flex gap-3">
                    <div className="rounded-full border-2 p-1 h-max">
                      <Image
                        alt={c.name}
                        width={32}
                        height={32}
                        src={c.icon_url || '/static/images/default.png'}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-600 w-[275px] truncate">
                        {c.name}
                      </span>
                      <span className="text-gray-500">
                        {c.transaction_type === 'in' ? 'Inflow' : 'Outflow'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 h-max ml-auto">
                    <MyButton
                      color="light"
                      onClick={() => {
                        setSelectedCategory(c)
                        setIsModalOpen(true)
                      }}
                      disabled={!c.is_owner}
                    >
                      <AiOutlineEdit size={16} />
                    </MyButton>
                    <MyButton
                      colorType="danger"
                      onClick={() => {
                        setIsDeleteOpen(true)
                      }}
                      disabled={!c.is_owner}
                    >
                      <AiOutlineDelete size={16} />
                    </MyButton>
                  </div>
                </li>
              ))}

              {d.data?.length <= 0 && (
                <li className="w-full items-center justify-center py-12">
                  <EmptyList />
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
