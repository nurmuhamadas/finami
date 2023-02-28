import { Chart } from 'react-google-charts'

import { useRouter } from 'next/router'

import { Alert } from 'flowbite-react'

import useGetTransactions from 'data/api/Transactions/useGetTransactions'

import AppLayout from 'components/AppLayout'
import OverviewCard from 'components/OverviewCard'
import TransactionListItem from 'components/TransactionListItem'
import { PAGES_URL, QUERY_URL } from 'utils/constants/pages'

import { chartOptions2 } from './consts'

const Dashboard = () => {
  const router = useRouter()

  const recentTrxData = useGetTransactions({
    limit: 5,
    sort_by: 'date',
    order_by: 'desc',
  })
  const topSpendData = useGetTransactions({
    transaction_type: 'out',
    limit: 5,
    sort_by: 'amount',
    order_by: 'desc',
  })
  const data = [
    ['', 'Last Month', 'This Month', ''],
    [' ', 0, 20000, 0], // this month
    [' ', 12000, 0, 0], // last nibtg
  ]
  const data2 = [
    ['', 'Expense', 'Planning', ''],
    [' ', 0, 2000000, 0], // planning
    [' ', 1202000, 0, 0], // expense
  ]

  return (
    <AppLayout description="Manage overview for your transaction">
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
                <p className="text-3xl font-bold text-white">Rp120,000</p>
                <span className="text-white">+20%</span>
              </div>
              <span className="text-sm text-white">
                Compared to last month (Rp100,000)
              </span>
            </div>
          </OverviewCard>

          {/* Income card */}
          <OverviewCard cardClassName="bg-gradient-to-r from-finamiGreenSecondary to-finamiGreen">
            <div className="flex flex-col space-y-4">
              <h3 className="block text-white">Income</h3>
              <div className="mb-3 flex items-center space-x-4">
                <p className="text-3xl font-bold text-white">Rp120,000</p>
                <span className="text-white">+20%</span>
              </div>
              <span className="text-sm text-white">
                Compared to last month (Rp100,000)
              </span>
            </div>
          </OverviewCard>

          {/* Expense card */}
          <OverviewCard cardClassName="bg-gradient-to-r from-finamiRedSecondary to-finamiRed">
            <div className="flex flex-col space-y-4">
              <h3 className="block text-white">Expense</h3>
              <div className="mb-3 flex items-center space-x-4">
                <p className="text-3xl font-bold text-white">Rp120,000</p>
                <span className="text-white">+20%</span>
              </div>
              <span className="text-sm text-white">
                Compared to last month (Rp100,000)
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
              <li className="flex space-x-4 border-b-2 border-gray-200 py-3">
                <div className="flex w-full flex-col space-y-2">
                  <span className="font-semibold">My Wallets</span>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-gray-700">Wallet 1</span>
                    <span className="font-semibold text-gray-600">
                      Rp. 12.000
                    </span>
                  </div>
                </div>
              </li>
              <li className="flex items-center justify-between space-x-4 py-3">
                <div className="flex w-full flex-col space-y-2">
                  <span className="font-semibold">Children 1 Wallets</span>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-gray-700">Wallet 1</span>
                    <span className="font-semibold text-gray-600">
                      Rp. 12.000
                    </span>
                  </div>
                </div>
              </li>
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
              {recentTrxData?.map((d) => (
                <TransactionListItem
                  key={JSON.stringify(d)}
                  data={d}
                  showDate
                  showUser
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
            actionUrl={`${PAGES_URL.transactions_analytics.url}?${QUERY_URL.transactions_analytics.transactionType}=out`}
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
                <Chart
                  chartType="Bar"
                  width="100%"
                  height="300px"
                  data={data}
                  options={{
                    ...chartOptions2,
                  }}
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-700">
                Top Spending
              </h4>
              <ul className="mt-6 flex flex-col">
                {topSpendData?.map((d) => (
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
                <Chart
                  chartType="Bar"
                  width="100%"
                  height="300px"
                  data={data2}
                  options={{
                    ...chartOptions2,
                  }}
                />
              </div>
              <Alert color="success">
                <span>You have Rp 800,000 remaining budget for this month</span>
              </Alert>
              {/* OR */}
              <Alert color="failure">
                <span>You have exceeded your budget by 20000</span>
              </Alert>
            </div>
          </OverviewCard>
        </div>
      </div>
    </AppLayout>
  )
}

export default Dashboard
