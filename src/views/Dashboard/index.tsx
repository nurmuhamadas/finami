import { useMemo } from 'react'
import { Chart } from 'react-google-charts'

import { useRouter } from 'next/router'

import cn from 'classnames'
import dayjs from 'dayjs'
import { Alert } from 'flowbite-react'

import useGetPlannings from 'data/api/plannings/useGetPlannings'
import useGetTransactions from 'data/api/Transactions/useGetTransactions'
import useGetWallets from 'data/api/Wallets/useGetWallets'

import AppLayout from 'components/AppLayout'
import EmptyList from 'components/EmptyList'
import Loader from 'components/Loader'
import OverviewCard from 'components/OverviewCard'
import TransactionListItem from 'components/TransactionListItem'
import { PAGES_URL, QUERY_URL } from 'utils/constants/pages'
import { formatCurrency, formatCurrencySign } from 'utils/helpers/formatter'
import { calculateRatio } from 'utils/helpers/helper'

import { chartOptions2 } from './consts'

const { transactions_analytics: ta } = QUERY_URL

const Dashboard = () => {
  const router = useRouter()

  const { data: recentTrxData, isLoading: isTrxLoading } = useGetTransactions({
    limit: 5,
    sort_by: 'date',
    order_by: 'desc',
  })
  const { data: topSpendData, isLoading: isSpendLoading } = useGetTransactions({
    start_date: dayjs().add(-1, 'month').startOf('month').toDate(),
    end_date: dayjs().endOf('month').toDate(),
    sort_by: 'amount',
    order_by: 'desc',
  })
  const { data: planningData, isLoading: isPlanLoading } = useGetPlannings({
    start_month: dayjs().startOf('month').toDate(),
    end_month: dayjs().endOf('month').toDate(),
  })
  const { data: walletsData, isLoading: isWalletLoading } = useGetWallets()

  const balance = useMemo(() => {
    if (walletsData?.length > 0) {
      return walletsData?.map((d) => d.balance)?.reduce((a, b) => a + b, 0)
    }

    return 0
  }, [walletsData])

  const thisMonthIncome = useMemo(() => {
    if (topSpendData?.length > 0) {
      const endLastMonth = dayjs().add(-1, 'month').endOf('month')
      return topSpendData
        ?.filter(
          (d) =>
            dayjs(d.date).isAfter(endLastMonth) && d.transaction_type === 'in',
        )
        ?.map((d) => d.amount)
        ?.reduce((a, b) => a + b, 0)
    }

    return 0
  }, [topSpendData])

  const thisMonthSpend = useMemo(() => {
    if (topSpendData?.length > 0) {
      const endLastMonth = dayjs().add(-1, 'month').endOf('month')
      return topSpendData
        ?.filter(
          (d) =>
            dayjs(d.date).isAfter(endLastMonth) && d.transaction_type === 'out',
        )
        ?.map((d) => d.amount)
        ?.reduce((a, b) => a + b, 0)
    }

    return 0
  }, [topSpendData])

  const lastMonthIncome = useMemo(() => {
    if (topSpendData?.length > 0) {
      const startNextMonth = dayjs().startOf('month')
      return topSpendData
        ?.filter(
          (d) =>
            dayjs(d.date).isBefore(startNextMonth) &&
            d.transaction_type === 'in',
        )
        ?.map((d) => d.amount)
        ?.reduce((a, b) => a + b, 0)
    }

    return 0
  }, [topSpendData])

  const lastMonthSpend = useMemo(() => {
    if (topSpendData?.length > 0) {
      const startNextMonth = dayjs().startOf('month')
      return topSpendData
        ?.filter(
          (d) =>
            dayjs(d.date).isBefore(startNextMonth) &&
            d.transaction_type === 'out',
        )
        ?.map((d) => d.amount)
        ?.reduce((a, b) => a + b, 0)
    }

    return 0
  }, [topSpendData])

  const thisPlanning = useMemo(() => {
    if (planningData?.length > 0) {
      return planningData?.map((d) => d.amount)?.reduce((a, b) => a + b, 0)
    }

    return 0
  }, [planningData])

  const diffPlanExpense = thisPlanning - thisMonthSpend
  const data = [
    ['', 'Last Month', 'This Month', ''],
    [' ', 0, thisMonthSpend, 0], // this month
    [' ', lastMonthSpend, 0, 0], // last nibtg
  ]
  const data2 = [
    ['', 'Expense', 'Planning', ''],
    [' ', 0, thisPlanning, 0], // planning
    [' ', thisMonthSpend, 0, 0], // expense
  ]

  return (
    <AppLayout description="See overview of your transaction">
      <div className="flex w-full flex-col">
        <div className="mb-8 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 xl:grid-cols-3 xl:gap-y-0">
          {/* Balance card */}
          <OverviewCard
            cardClassName="bg-gradient-to-r from-finamiBlueSecondary to-finamiBlue"
            onCardClick={async () => {
              await router.push(PAGES_URL.wallets.url)
            }}
          >
            <div className="flex flex-col space-y-4">
              <h3 className="block text-white">Balance</h3>
              <div className="mb-3 flex items-center space-x-4">
                <p className="text-3xl font-bold text-white">
                  {isWalletLoading && 'Loading...'}
                  {formatCurrencySign(balance)}
                </p>
                <span className="text-white">
                  {calculateRatio(balance, balance - thisMonthSpend)}
                </span>
              </div>
              <span className="text-sm text-white">
                Compared to last month (
                {formatCurrencySign(balance - thisMonthSpend)})
              </span>
            </div>
          </OverviewCard>

          {/* Income card */}
          <OverviewCard cardClassName="bg-gradient-to-r from-finamiGreenSecondary to-finamiGreen">
            <div className="flex flex-col space-y-4">
              <h3 className="block text-white">Income</h3>
              <div className="mb-3 flex items-center space-x-4">
                <p className="text-3xl font-bold text-white">
                  {isTrxLoading && 'Loading...'}
                  {formatCurrencySign(thisMonthIncome)}
                </p>
                <span className="text-white">
                  {calculateRatio(thisMonthIncome, lastMonthIncome)}
                </span>
              </div>
              <span className="text-sm text-white">
                {isTrxLoading && 'Loading...'}
                Compared to last month ({formatCurrencySign(lastMonthIncome)})
              </span>
            </div>
          </OverviewCard>

          {/* Expense card */}
          <OverviewCard cardClassName="bg-gradient-to-r from-finamiRedSecondary to-finamiRed">
            <div className="flex flex-col space-y-4">
              <h3 className="block text-white">Expense</h3>
              <div className="mb-3 flex items-center space-x-4">
                <p className="text-3xl font-bold text-white">
                  {formatCurrencySign(thisMonthSpend)}
                </p>
                <span className="text-white">
                  {calculateRatio(thisMonthSpend, lastMonthSpend)}
                </span>
              </div>
              <span className="text-sm text-white">
                Compared to last month ({formatCurrencySign(lastMonthSpend)})
              </span>
            </div>
          </OverviewCard>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-6">
          {/* Wallet */}
          <OverviewCard
            title="All Wallets"
            actionText="See all"
            actionUrl={PAGES_URL.wallets.url}
            wrapperClassName="mb-8"
          >
            <ul className="flex flex-col">
              {walletsData?.map((d) => {
                return (
                  <li
                    key={d.id}
                    className="flex space-x-4 border-b-2 border-gray-200 py-3"
                  >
                    <div className="flex w-full flex-col space-y-2">
                      <span className="font-semibold">{d.name}</span>
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm text-gray-700">
                          {d.user_fullname}
                        </span>
                        <span className="font-semibold text-gray-600">
                          {formatCurrencySign(d.balance)}
                        </span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </OverviewCard>

          {/* Recent Transaction */}
          <OverviewCard
            title="Recent Transactions"
            actionText="See all"
            actionUrl={PAGES_URL.transactions.url}
            cardClassName="planning-card-btn"
          >
            <ul className="flex flex-col">
              {isTrxLoading && <Loader />}

              {!isTrxLoading && !recentTrxData?.length && <EmptyList />}

              {recentTrxData?.map((d) => (
                <TransactionListItem
                  key={JSON.stringify(d)}
                  data={d}
                  showDate
                  showUser
                  walletClassname="!w-56"
                  onClick={async () => {
                    await router.push(`${PAGES_URL.transactions.url}/${d.id}`)
                  }}
                />
              ))}
            </ul>
          </OverviewCard>

          {/* Spending Report */}
          <OverviewCard
            title="Spending Report"
            actionText="View Detail"
            actionUrl={`${PAGES_URL.transactions_analytics.url}?${
              ta.transaction_type
            }=out&${ta.startDate}=${dayjs().startOf('month').toISOString()}&${
              ta.endDate
            }=${dayjs().endOf('month').toISOString()}`}
            wrapperClassName="mb-8"
          >
            <div className="flex flex-col">
              <div className="mb-12 flex flex-col">
                <div className="mb-6 flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="mr-2 block h-4 w-4 bg-finamiBlue"></div>
                    <span>This Month</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 block h-4 w-4 bg-finamiBlueSecondary"></div>
                    <span>Last Month</span>
                  </div>
                </div>
                {isSpendLoading && <Loader />}
                {!isSpendLoading && (
                  <Chart
                    chartType="Bar"
                    width="100%"
                    height="300px"
                    data={data}
                    options={{
                      ...chartOptions2,
                    }}
                  />
                )}
              </div>
              <h4 className="text-lg font-semibold text-gray-700">
                Top Spending
              </h4>
              <ul className="mt-6 flex flex-col">
                {isSpendLoading && <Loader />}

                {!isSpendLoading && !topSpendData?.length && <EmptyList />}

                {topSpendData?.slice(0, 5)?.map((d) => (
                  <TransactionListItem
                    key={JSON.stringify(d)}
                    data={d}
                    disableAmountFormatting
                    showDate
                    showUser
                    onClick={async () => {
                      await router.push(`${PAGES_URL.transactions.url}/${d.id}`)
                    }}
                  />
                ))}
              </ul>
            </div>
          </OverviewCard>

          {/* Planning Analytic */}
          <OverviewCard
            title="Budget Analytic"
            actionText="View Detail"
            actionUrl={PAGES_URL.plannings_analytics.url}
            wrapperClassName="mb-8"
          >
            <div className="flex flex-col">
              <div className="mb-12 flex flex-col">
                <div className="mb-6 flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="mr-2 block h-4 w-4 bg-finamiBlue"></div>
                    <span>Planning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 block h-4 w-4 bg-finamiBlueSecondary"></div>
                    <span>Expense</span>
                  </div>
                </div>
                {(isSpendLoading || isPlanLoading) && <Loader />}
                {!(isSpendLoading || isPlanLoading) && (
                  <Chart
                    chartType="Bar"
                    width="100%"
                    height="300px"
                    data={data2}
                    options={{
                      ...chartOptions2,
                    }}
                  />
                )}
              </div>
              <Alert
                color="success"
                className={cn({ hidden: diffPlanExpense < 0 })}
              >
                <span>
                  You have Rp. {formatCurrency(diffPlanExpense)} remaining
                  budget for this month
                </span>
              </Alert>
              {/* OR */}
              <Alert
                color="failure"
                className={cn({ hidden: diffPlanExpense >= 0 })}
              >
                <span>
                  You have exceeded your budget by Rp.{' '}
                  {formatCurrency(Math.abs(diffPlanExpense))}
                </span>
              </Alert>
            </div>
          </OverviewCard>
        </div>
      </div>
    </AppLayout>
  )
}

export default Dashboard
