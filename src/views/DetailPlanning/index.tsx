import { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineDelete } from 'react-icons/ai'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

import dayjs from 'dayjs'
import { Alert } from 'flowbite-react'

import useGetPlanningById from 'data/api/plannings/useGetPlanningById'
import deletePlanningMutation from 'data/mutations/plannings/deletePlanningMutation'
import putPlanningMutation from 'data/mutations/plannings/putPlanningMutation'
import { type CreatePlanningPayload } from 'data/types'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import { PAGES_URL } from 'utils/constants/pages'
import PlanningForm from 'views/NewPlanning/component/Form'

const MyModal = dynamic(async () => await import('components/MyModal'))

const NewPlanningPage = () => {
  const router = useRouter()
  const query = router.query as Record<string, string>

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const { data } = useGetPlanningById(query?.id, { enabled: !!query?.id })
  const isPlanFinished = dayjs(data?.month).isBefore(dayjs().startOf('month'))

  const updateMutation = putPlanningMutation()
  const deleteMutation = deletePlanningMutation()

  const handleSubmit = async (values: CreatePlanningPayload) => {
    try {
      setErrorMessage(undefined)

      await updateMutation.mutateAsync({
        id: query.id,
        payload: {
          amount: values.amount,
          category_id: values.category_id,
          name: values.name,
          wallet_id: values.wallet_id,
        },
      })

      await router.push(PAGES_URL.plannings.url)
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  const handleDelete = async () => {
    try {
      setErrorMessage(undefined)

      if (query.id) await deleteMutation.mutateAsync(query.id)

      await router.push(PAGES_URL.plannings.url)
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  return (
    <AppLayout
      title="Detail Planning"
      description="Don't let your money flow with no purpose. Plan it!"
    >
      <div className="flex w-full flex-col space-y-8 max-w-4xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href={{
                pathname: PAGES_URL.plannings.url,
                query,
              }}
              passHref
            >
              <MyButton color="light">
                <AiOutlineArrowLeft />
              </MyButton>
            </Link>
          </div>
          <div className="flex items-center">
            <MyButton
              colorType="danger"
              onClick={() => {
                setIsDeleteOpen(true)
              }}
              disabled={isPlanFinished}
            >
              <AiOutlineDelete size={18} />
            </MyButton>
          </div>
        </div>

        {isPlanFinished && (
          <Alert color="success">Plan has been finished</Alert>
        )}

        {errorMessage && (
          <Alert
            color="failure"
            className=""
            onDismiss={() => {
              setErrorMessage(undefined)
            }}
          >
            {errorMessage}
          </Alert>
        )}

        <PlanningForm
          onSubmit={handleSubmit}
          initialData={data}
          disableForm={
            !data?.is_owner || updateMutation.isLoading || isPlanFinished
          }
          isLoading={updateMutation.isLoading}
          onValueChange={() => {
            setErrorMessage(undefined)
          }}
          disableInput={{
            month: true,
          }}
          isChildData={!data?.is_owner}
        />

        <MyModal
          show={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false)
            setErrorMessage(undefined)
          }}
          header="Delete confirmation"
          footer={
            <MyButton
              colorType="danger"
              className="ml-auto"
              onClick={handleDelete}
            >
              Delete
            </MyButton>
          }
        >
          {errorMessage && (
            <Alert
              color="failure"
              onDismiss={() => {
                setErrorMessage(undefined)
              }}
            >
              {errorMessage}
            </Alert>
          )}
          <p>Are you sure want to delete this plan?</p>
        </MyModal>
      </div>
    </AppLayout>
  )
}

export default NewPlanningPage
