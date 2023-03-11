import { Fragment, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Alert } from 'flowbite-react'

import useGetTransactionById from 'data/api/Transactions/useGetTransactionById'
import putTransactionMutation from 'data/mutations/transactions/putTransactionMutation'
import { type CreateTransactionPayload } from 'data/types'

import AppLayout from 'components/AppLayout'
import TransactionForm from 'components/Forms/Transactions'
import MyButton from 'components/MyButton'
import { PAGES_URL } from 'utils/constants/pages'

const DetailTransactionPage = () => {
  const router = useRouter()
  const trxId = router.query?.id as string

  const [errorMessage, setErrorMessage] = useState(undefined)

  const updateTransaction = putTransactionMutation()

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
      </Fragment>
    </AppLayout>
  )
}

export default DetailTransactionPage
