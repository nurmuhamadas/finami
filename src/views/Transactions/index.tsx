import { useEffect, useMemo, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import Link from 'next/link'
import { useRouter } from 'next/router'

import dayjs from 'dayjs'

import useGetTransactions from 'data/api/Transactions/useGetTransactions'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import TransactionListItem from 'components/TransactionListItem'
import { PAGES_URL, QUERY_URL } from 'utils/constants/pages'
import { dayjsToDate, formatCurrency } from 'utils/helpers/formatter'
import { groupTransactionByDate } from 'utils/helpers/helper'

import FilterTransactions from './components/filter'
import { type FilterTransactionValueType } from './components/filter/types'
import TransactionHeader from './components/TransactionHeader'

const { transactions_analytics: ta } = QUERY_URL

const TransactionsPage = () => {
  const router = useRouter()
  const orgQuery = router.query as Record<string, string>

  const [filter, setFilter] = useState<FilterTransactionValueType>({
    startDate: dayjsToDate(dayjs().startOf('month')),
    endDate: dayjsToDate(dayjs().endOf('month')),
  })

  const orgData = useGetTransactions({
    ...filter,
    start_date: filter.startDate,
    end_date: filter.endDate,
  })
  const { inAmount, outAmount, totalAmount, data } =
    groupTransactionByDate(orgData)

  const query = useMemo(() => {
    const _f: Record<string, string> = {}
    if (filter?.startDate) _f[ta.startDate] = filter?.startDate?.toISOString()
    if (filter?.endDate) _f[ta.endDate] = filter?.endDate?.toISOString()
    if (filter?.category_id) _f[ta.category_id] = filter?.category_id
    if (filter?.child_id) _f[ta.user_id] = filter?.child_id
    if (filter?.wallet_id) _f[ta.wallet_id] = filter?.wallet_id
    return _f
  }, [filter])

  useEffect(() => {
    if (orgQuery) {
      setFilter({
        ...filter,
        startDate: orgQuery?.[ta.startDate]
          ? new Date(orgQuery?.[ta.startDate])
          : filter.startDate,
        endDate: orgQuery?.[ta.endDate]
          ? new Date(orgQuery?.[ta.endDate])
          : filter.endDate,
        category_id: orgQuery?.[ta.category_id],
        wallet_id: orgQuery?.[ta.wallet_id],
        child_id: orgQuery?.[ta.user_id],
      })
    }
  }, [orgQuery])

  return (
    <AppLayout description="Record inflow and outflow of your family finance here">
      <div className="flex flex-col space-y-8">
        <FilterTransactions
          initialValues={filter}
          onChange={setFilter}
          startComponent={
            <div className="flex items-center space-x-2">
              <MyButton
                onClick={async () => {
                  await router.push(
                    { pathname: PAGES_URL.transactions_new.url, query },
                    PAGES_URL.transactions_new.url,
                  )
                }}
                colorType="primary"
              >
                <AiOutlinePlus />
              </MyButton>
            </div>
          }
        />

        <div className="grid max-w-4xl gap-8">
          <div className="flex items-center space-x-3 justify-between">
            <p className="font-semibold">
              Period: {dayjs(filter.startDate).format('DD MMM YYYY')} -{' '}
              {dayjs(filter.endDate).format('DD MMM YYYY')}
            </p>
            <Link
              href={{
                pathname: PAGES_URL.transactions_analytics.url,
                query,
              }}
              passHref
            >
              <MyButton
                color="light"
                className="!text-gray-500 hover:!bg-finamiBlue hover:!text-white !text-sm"
              >
                <span className="text-sm">View Report</span>
              </MyButton>
            </Link>
          </div>
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
                  + Rp. {formatCurrency(inAmount)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="">Outflow</span>
                <span className="text-finamiRed font-semibold">
                  - Rp. {formatCurrency(outAmount)}
                </span>
              </li>
              <li className="border-b-2 " />
              <li className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {totalAmount < 0 ? '-' : ''} Rp.{' '}
                  {formatCurrency(Math.abs(totalAmount))}
                </span>
              </li>
            </ul>
          </OverviewCard>

          {data.map((_data) => {
            const f = 'DD-MM-YYYY'
            const _d = _data.date
            let title = ''
            const _today = dayjs().format(f)

            if (dayjs(_d).format(f) === _today) {
              title = 'Today'
            } else if (dayjs(_d).add(1, 'day').format(f) === _today) {
              title = 'Yesterday'
            } else {
              title = dayjs(_d).format('dddd, DD MMM YYYY')
            }

            return (
              <OverviewCard
                key={JSON.stringify(_data)}
                title={title}
                Header={<TransactionHeader total={_data.totalAmount} />}
              >
                <ul className="flex flex-col space-y-4 w-full">
                  {_data.data.map((d) => (
                    <TransactionListItem
                      key={d.id}
                      data={d}
                      onClick={async (_d) => {
                        await router.push(
                          `${PAGES_URL.transactions.url}/${d.id}`,
                          undefined,
                        )
                      }}
                      showDescription
                      showUser
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
