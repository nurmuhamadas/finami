import { Chart } from 'react-google-charts'

import { Alert } from 'flowbite-react'

import AppLayout from 'components/AppLayout'
import OverviewCard from 'components/OverviewCard'
import TransactionListItem from 'components/TransactionListItem'
import { PAGES_URL } from 'utils/constants/pages'

const Dashboard = () => {
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

  const options = {
    colors: ['#968BE1', '#6453DD', 'white'],
    legend: { position: 'none' },
  }

  const options2 = {
    colors: ['#968BE1', '#6453DD', 'white'],
    legend: { position: 'none' },
  }

  return (
    <AppLayout
      title="Dashboard"
      description="Manage overview for your transaction"
    >
      <div className="flex w-full flex-col">
        <div className="mb-8 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 xl:grid-cols-3 xl:gap-y-0">
          {/* Balance card */}
          <OverviewCard cardClassName="bg-gradient-to-r from-finamiBlueSecondary to-finamiBlue">
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

        <div className="mb-8 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-6 md:gap-y-0">
          {/* Wallet */}
          <OverviewCard
            title="All Wallets"
            actionText="See all"
            actionUrl={PAGES_URL.wallets}
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
            actionUrl={PAGES_URL.transactions}
          >
            <ul className="flex flex-col space-y-4">
              <TransactionListItem
                data={{
                  id: 'trx-1',
                  name: 'Transaction In',
                  amount: 12000,
                  transactionType: 'in',
                  date: '21 Januari 2023',
                }}
              />
              <TransactionListItem
                data={{
                  id: 'trx-2',
                  name: 'Transaction Out',
                  amount: 22000,
                  transactionType: 'out',
                  date: '21 Januari 2023',
                }}
              />
              <TransactionListItem
                data={{
                  id: 'trx-3',
                  name: 'Transaction In',
                  amount: 112000,
                  transactionType: 'in',
                  date: '21 Januari 2023',
                }}
              />
            </ul>
          </OverviewCard>

          {/* Spending Report */}
          <OverviewCard
            title="Spending Report"
            actionText="View Detail"
            actionUrl={PAGES_URL.analytics}
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
                    ...options,
                  }}
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-700">
                Top Spending
              </h4>
              <ul className="mt-6 flex flex-col space-y-4">
                <TransactionListItem
                  data={{
                    id: 'trx-1',
                    name: 'Transaction Out',
                    amount: 12000,
                    transactionType: 'other',
                    date: '21 Januari 2023',
                  }}
                />
                <TransactionListItem
                  data={{
                    id: 'trx-2',
                    name: 'Transaction Out',
                    amount: 22000,
                    transactionType: 'other',
                    date: '21 Januari 2023',
                  }}
                />
              </ul>
            </div>
          </OverviewCard>

          {/* Planning Analytic */}
          <OverviewCard
            title="Budget Analytic"
            actionText="View Detail"
            actionUrl={PAGES_URL.analytics}
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
                    ...options2,
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
