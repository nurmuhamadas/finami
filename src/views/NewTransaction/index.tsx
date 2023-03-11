import { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Alert } from 'flowbite-react'

import postTransactionMutation from 'data/mutations/transactions/postTransactionMutation'
import { type CreateTransactionPayload } from 'data/types'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import { PAGES_URL, QUERY_URL } from 'utils/constants/pages'

import NewTransactionForm from '../../components/Forms/Transactions'

const { transactions_analytics: ta } = QUERY_URL

const NewTransactionPage = () => {
  const router = useRouter()
  const query = router.query as Record<string, string>

  const initialValues: CreateTransactionPayload = {
    category_id: query?.[ta.category_id],
    wallet_id: query?.[ta.wallet_id],
    amount: undefined,
    description: undefined,
    transaction_type: undefined,
    date: new Date(),
  }

  const [errorMessage, setErrorMessage] = useState(undefined)

  const createTransaction = postTransactionMutation()

  const handleRegister = async (values: CreateTransactionPayload) => {
    try {
      setErrorMessage(undefined)

      await createTransaction.mutateAsync(values)

      await router.push(PAGES_URL.transactions.url)
    } catch (error) {
      setErrorMessage((error as Error).message)
    }
  }

  return (
    <AppLayout>
      <div className="flex flex-col space-y-8 max-w-5xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href={{
                pathname: PAGES_URL.transactions.url,
                query,
              }}
              passHref
            >
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

        <NewTransactionForm
          initialData={{
            ...initialValues,
            is_owner: false,
          }}
          onSubmit={handleRegister}
          disableForm={createTransaction.isLoading}
          isLoading={createTransaction.isLoading}
          onValueChange={() => {
            setErrorMessage(undefined)
          }}
        />
      </div>
    </AppLayout>
  )
}

export default NewTransactionPage
