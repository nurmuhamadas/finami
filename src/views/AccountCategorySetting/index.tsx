import { useMemo, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'
import Select from 'react-tailwindcss-select'
import { type Option } from 'react-tailwindcss-select/dist/components/type'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { Alert } from 'flowbite-react'

import useGetCategories from 'data/api/Categories/useGetCategories'
import deleteCategoryMutation from 'data/mutations/categories/deleteCategoryMutation'
import postCategoryMutation from 'data/mutations/categories/postCategoryMutation'
import putCategoryMutation from 'data/mutations/categories/putCategoryMutation'
import {
  type CategoryDataResponse,
  type CreateCategoryPayload,
  type UpdateCategoryPayload,
} from 'data/types'

import AppLayout from 'components/AppLayout'
import EmptyList from 'components/EmptyList'
import Loader from 'components/Loader'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import { useAuth } from 'contexts/AuthContext'
import { TRANSACTION_TYPES_OPT } from 'utils/constants/common'
import { type TransactionTypesType } from 'utils/constants/types'
import { groupCategoriesByGroup } from 'utils/helpers/helper'

const MyModal = dynamic(async () => await import('components/MyModal'))
const ModalRegisterCategory = dynamic(
  async () => await import('./components/ModalRegisterCategory'),
)

const AccountCategorySetting = () => {
  const { user } = useAuth()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<Option>(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDataResponse>(undefined)

  const createCategoryMutation = postCategoryMutation()
  const updateCategoryMutation = putCategoryMutation()
  const deleteCategoryMt = deleteCategoryMutation()

  const { data, isLoading, refetch } = useGetCategories(
    {
      transaction_type: transactionType?.value as TransactionTypesType,
      user_id: user?.id,
    },
    { enabled: !!user?.id },
  )
  const grouppedData = useMemo(() => {
    if (data?.length > 0) {
      return groupCategoriesByGroup(data)
    }

    return []
  }, [data])

  const handleRegister = async (
    values: CreateCategoryPayload | UpdateCategoryPayload,
  ) => {
    setErrorMessage(undefined)
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('group', values.group)
      if (values.icon) formData.append('icon', values.icon)
      formData.append('transaction_type', values.transaction_type)

      if (selectedCategory) {
        await updateCategoryMutation.mutateAsync({
          id: selectedCategory.id,
          payload: formData,
        })
      } else {
        await createCategoryMutation.mutateAsync(formData)
      }
      await refetch()

      setSelectedCategory(undefined)
      setIsModalOpen(false)
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  const handleDelete = async () => {
    setErrorMessage(undefined)
    try {
      if (!!selectedCategory && selectedCategory?.is_owner) {
        await deleteCategoryMt.mutateAsync(selectedCategory?.id)
        await refetch()

        setSelectedCategory(undefined)
        setIsDeleteOpen(false)
      }
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
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
              disabled={isLoading}
            >
              <AiOutlinePlus />
            </MyButton>
          </div>
        </div>

        {isLoading && <Loader />}

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
                    <div className="rounded-full border-2 p-1 h-max overflow-hidden">
                      <Image
                        alt={c.name}
                        width={32}
                        height={32}
                        src={
                          (c.icon_url?.includes('images/')
                            ? `${process.env.BE_URL}/${c.icon_url}`
                            : c.icon_url) || '/static/images/default.png'
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-600 w-[225px] sm:w-[275px] truncate">
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
                        setSelectedCategory(c)
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
            setErrorMessage(undefined)
            setSelectedCategory(undefined)
            setIsModalOpen(false)
          }}
          onSubmit={handleRegister}
          initialData={{
            ...selectedCategory,
            icon: null,
          }}
          errorMessage={errorMessage}
          loading={
            createCategoryMutation?.isLoading ||
            updateCategoryMutation.isLoading
          }
          disableForm={selectedCategory && !selectedCategory?.is_owner}
        />

        <MyModal
          show={isDeleteOpen}
          onClose={() => {
            setErrorMessage(undefined)
            setSelectedCategory(undefined)
            setIsDeleteOpen(false)
          }}
          header={<span>Delete Confirmation</span>}
          footer={
            <MyButton
              colorType="danger"
              className="ml-auto"
              onClick={handleDelete}
              loading={deleteCategoryMt.isLoading}
            >
              Delete
            </MyButton>
          }
        >
          {errorMessage && (
            <Alert color="failure" className="mb-4">
              {errorMessage}
            </Alert>
          )}
          <p>
            <span className="font-semibold">{selectedCategory?.name}</span>{' '}
            category will be deleted. Are you sure?
          </p>
        </MyModal>
      </div>
    </AppLayout>
  )
}

export default AccountCategorySetting
