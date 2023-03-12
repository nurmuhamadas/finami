import { Fragment, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineDelete } from 'react-icons/ai'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import cn from 'classnames'
import { Alert } from 'flowbite-react'

import useGetTransactionById from 'data/api/Transactions/useGetTransactionById'
import deleteTransactionMutation from 'data/mutations/transactions/deleteTransactionMutation'
import putTransactionMutation from 'data/mutations/transactions/putTransactionMutation'
import { type CreateTransactionPayload } from 'data/types'

import AppLayout from 'components/AppLayout'
import TransactionForm from 'components/Forms/Transactions'
import MyButton from 'components/MyButton'
import { PAGES_URL } from 'utils/constants/pages'

const MyModal = dynamic(async () => await import('components/MyModal'))

const DetailTransactionPage = () => {
  const router = useRouter()
  const trxId = router.query?.id as string

  const [errorMessage, setErrorMessage] = useState(undefined)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const updateTransaction = putTransactionMutation()
  const deleteTransaction = deleteTransactionMutation()

  const { data } = useGetTransactionById(trxId)

  const handleUpdate = async (values: CreateTransactionPayload) => {
    try {
      setErrorMessage(undefined)

      if (trxId) {
        await updateTransaction.mutateAsync({
          id: trxId,
          payload: {
            amount: values.amount,
            category_id: values.category_id,
            date: values.date,
            description: values.description,
            transaction_type: values.transaction_type,
            wallet_id: values.wallet_id,
            image_url: values.image_url || undefined,
          },
        })
      }

      await router.push(PAGES_URL.transactions.url)
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  const handleDelete = async () => {
    try {
      setErrorMessage(undefined)

      if (trxId) {
        await deleteTransaction.mutateAsync(trxId)
      }

      setIsModalDeleteOpen(false)
      await router.replace(PAGES_URL.transactions.url)
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  return (
    <AppLayout title="Detail Transaction">
      <Fragment>
        <Head>
          <title>Finami - Detail Transaction</title>
        </Head>
        <div className="flex flex-col space-y-8 max-w-5xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href={PAGES_URL.transactions.url} passHref>
                <MyButton color="light">
                  <AiOutlineArrowLeft />
                </MyButton>
              </Link>
            </div>
            <div>
              <MyButton
                colorType="danger"
                onClick={() => {
                  setIsModalDeleteOpen(true)
                }}
                className={cn({ hidden: !data?.is_owner })}
              >
                <AiOutlineDelete />
              </MyButton>
            </div>
          </div>

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

          <TransactionForm
            disableForm={!data?.is_owner || updateTransaction?.isLoading}
            isLoading={updateTransaction?.isLoading}
            initialData={data}
            onSubmit={handleUpdate}
            onValueChange={() => {
              setErrorMessage(undefined)
            }}
          />
        </div>

        <MyModal
          show={isModalDeleteOpen}
          onClose={() => {
            setIsModalDeleteOpen(false)
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
          <p>Are you sure want to delete this transaction?</p>
        </MyModal>
      </Fragment>
    </AppLayout>
  )
}

export default DetailTransactionPage
