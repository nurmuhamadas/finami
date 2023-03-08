import { Fragment } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useGetTransactionById from 'data/api/Transactions/useGetTransactionById'
import { type CreateTransactionPayload } from 'data/types'

import AppLayout from 'components/AppLayout'
import TransactionForm from 'components/Forms/Transactions'
import MyButton from 'components/MyButton'
import { PAGES_URL } from 'utils/constants/pages'

const DetailTransactionPage = () => {
  const router = useRouter()
  const trxId = router.query?.id

  const { data } = useGetTransactionById(trxId as string)

  const handleUpdate = (value: CreateTransactionPayload) => {
    console.log(value)
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
          <TransactionForm
            disableForm={!data?.is_owner}
            initialData={data}
            onSubmit={handleUpdate}
          />
        </div>
      </Fragment>
    </AppLayout>
  )
}

export default DetailTransactionPage
