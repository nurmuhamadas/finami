import { AiOutlineArrowLeft } from 'react-icons/ai'

import Link from 'next/link'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import { PAGES_URL } from 'utils/constants/pages'

import NewTransactionForm from './components/Form'
import { type NewTransactionDataType } from './components/Form/types'

const NewTransactionPage = () => {
  const handleRegister = (value: NewTransactionDataType) => {
    console.log(value)
  }

  return (
    <AppLayout title="Create New Transactions">
      <div className="flex flex-col space-y-8 max-w-5xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={PAGES_URL.transactions} passHref>
              <MyButton color="light">
                <AiOutlineArrowLeft />
              </MyButton>
            </Link>
          </div>
        </div>
        <NewTransactionForm onSubmit={handleRegister} />
      </div>
    </AppLayout>
  )
}

export default NewTransactionPage
