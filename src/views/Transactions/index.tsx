import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import dayjs from 'dayjs'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import TransactionListItem from 'components/TransactionListItem'
import { type TransactionDataType } from 'utils/constants/types'
import { formatCurrency } from 'utils/helpers/formatter'
import {
  calcTotalTransaction,
  groupTransactionByDate,
} from 'utils/helpers/helper'

import FilterTransactions from './components/filter'
import { type FilterTransactionValueType } from './components/filter/types'
import TransactionHeader from './components/TransactionHeader'

const dummyData: TransactionDataType[] = [
  {
    id: 'trx-1',
    name: 'Transaction In',
    amount: 10000,
    transactionType: 'in',
    date: '21 February 2023',
  },
  {
    id: 'trx-2',
    name: 'Transaction Out',
    amount: 12000,
    transactionType: 'out',
    date: '21 February 2023',
  },
  {
    id: 'trx-3',
    name: 'Transaction In 2',
    amount: 20000,
    transactionType: 'in',
    date: '15 February 2023',
  },
  {
    id: 'trx-4',
    name: 'Transaction Out 2',
    amount: 2000,
    transactionType: 'in',
    date: '12 February 2023',
  },
]

const TransactionsPage = () => {
  const [filter, setFilter] = useState<FilterTransactionValueType>({})
  console.log(filter)
  const totalFlow = calcTotalTransaction(dummyData)

  return (
    <AppLayout
      title="Transactions"
      description="Record inflow and outflow of your family finance here"
    >
      <div className="flex flex-col space-y-8">
        <FilterTransactions
          onChange={setFilter}
          startComponent={
            <div className="flex items-center space-x-2">
              <MyButton colorType="primary">
                <AiOutlinePlus />
              </MyButton>
              <MyButton
                color="light"
                className="!text-gray-500 hover:!bg-finamiBlue hover:!text-white !text-sm"
              >
                <span className="text-sm">View Report</span>
              </MyButton>
            </div>
          }
        />

        <div className="grid max-w-4xl gap-8">
          <OverviewCard
            Header={
              <div className="flex ">
                <span className="font-bold text-lg">Flow Overview</span>
              </div>
            }
          >
            <ul className="flex flex-col space-y-4">
              <li className="flex justify-between items-center">
                <span className="">Inflow</span>
                <span className=" text-finamiGreen font-semibold">
                  + Rp. {formatCurrency(totalFlow.in)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="">Outflow</span>
                <span className="text-finamiRed font-semibold">
                  - Rp. {formatCurrency(totalFlow.out)}
                </span>
              </li>
              <li className="border-b-2 " />
              <li className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {totalFlow.total < 0 ? '-' : ''} Rp.{' '}
                  {formatCurrency(Math.abs(totalFlow.total))}
                </span>
              </li>
            </ul>
          </OverviewCard>

          {groupTransactionByDate(dummyData).map((_data) => {
            const f = 'DD-MM-YYYY'
            const _d = _data[0].date
            let title = ''
            const _today = dayjs().format(f)

            if (dayjs(_d).format(f) === _today) {
              title = 'Today'
            } else if (dayjs(_d).add(1, 'day').format(f) === _today) {
              title = 'Yesterday'
            } else {
              title = dayjs(_data[0].date).format('DD MMM YYYY')
            }

            return (
              <OverviewCard
                key={_data.toString()}
                title={title}
                Header={<TransactionHeader data={_data} />}
              >
                <ul className="flex flex-col space-y-4">
                  {_data.map((d) => (
                    <TransactionListItem
                      key={d.id}
                      data={d}
                      onClick={(_d) => {
                        console.log(_d)
                      }}
                    />
                  ))}
                </ul>
              </OverviewCard>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}

export default TransactionsPage
