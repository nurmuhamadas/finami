import { useEffect, useMemo, useState } from 'react'
import { Chart } from 'react-google-charts'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import Link from 'next/link'
import { useRouter } from 'next/router'

import dayjs from 'dayjs'

import useGetTransactions from 'data/api/Transactions/useGetTransactions'
import { type GetTransactionsQuery } from 'data/types'

import AppLayout from 'components/AppLayout'
import ChartLegends from 'components/ChartLegends'
import MyButton from 'components/MyButton'
import MyModal from 'components/MyModal'
import OverviewCard from 'components/OverviewCard'
import { PAGES_URL, QUERY_URL } from 'utils/constants/pages'
import { formatDataToBarChart } from 'utils/helpers/chart'
import {
  groupTransactionByCategory,
  groupTransactionByWeek,
} from 'utils/helpers/helper'

import CardHeader from './components/CardHeader'
import { chartColors, chartOptions, chartOptions2 } from './consts'

const { transactions_analytics: ta } = QUERY_URL

const TransactionAnalyticsPage = () => {
  const router = useRouter()
  const query = router.query as Record<string, string>

  const [filter, setFilter] = useState<GetTransactionsQuery>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const orgData = useGetTransactions(filter)
  const dataByWeeks = useMemo(
    () =>
      groupTransactionByWeek(orgData, {
        startDate: filter.start_date,
        endDate: filter.end_date,
      }),
    [orgData],
  )

  const { dataByCategory, chartData1, chartData2, chartData3 } = useMemo(() => {
    if (orgData?.length) {
      // Data By Weeks
      const _d = dataByWeeks.data.map((d) => ({
        ...d,
        xLabel: `${dayjs(d.dateRange[0]).format('DD-MM')}-${dayjs(
          d.dateRange[1],
        ).format('DD-MM')}`,
      }))
      const chartData1 = formatDataToBarChart(_d, {
        legendLabels: ['Income', 'Expense'],
        xAxisKey: 'xLabel',
        yAxisKey: ['inAmount', 'outAmount'],
        xAxisLabel: '',
      })

      // Data By Category
      const dataByCategory = groupTransactionByCategory(orgData)
      const _dCat = dataByCategory.data
      const chartData2 = formatDataToBarChart(_dCat, {
        legendLabels: ['Income'],
        xAxisKey: 'category_name',
        yAxisKey: ['inAmount'],
        xAxisLabel: '',
      })
      const chartData3 = formatDataToBarChart(_dCat, {
        legendLabels: ['Expense'],
        xAxisKey: 'category_name',
        yAxisKey: ['outAmount'],
        xAxisLabel: '',
      })

      return {
        dataByCategory,
        chartData1,
        chartData2,
        chartData3,
      }
    }

    return {}
  }, [orgData])

  useEffect(() => {
    if (query) {
      setFilter({
        category_id: query[ta.category_id] || undefined,
        start_date: query[ta.startDate]
          ? new Date(query[ta.startDate])
          : undefined,
        end_date: query[ta.endDate] ? new Date(query[ta.endDate]) : undefined,
        wallet_id: query[ta.wallet_id] || undefined,
        search_key: query[ta.search_key] || undefined,
        sort_by: 'date',
        order_by: 'desc',
      })
    }
  }, [query])

  return (
    <AppLayout description="Analyze your transaction flow">
      <div className="flex flex-col space-y-8">
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
        <div className="w-full">
          {/* Summary Analytic */}
          <OverviewCard
            title="Summary"
            wrapperClassName="mb-8 max-w-3xl"
            Header={
              <CardHeader
                onButtonClick={() => {
                  setIsModalOpen(true)
                }}
                amount={dataByWeeks.totalAmount}
                label="Income"
              />
            }
            loading={chartData1?.length <= 0}
          >
            <div className="flex flex-col pb-6 space-y-16 overflow-auto">
              <div className="flex w-full overflow-x-auto py-4 pb-6 finamiBlueScollX">
                <div className="flex flex-col">
                  <ChartLegends
                    legends={[
                      { color: 'bg-finamiBlue', label: 'Income' },
                      { color: 'bg-finamiBlueSecondary', label: 'Expense' },
                    ]}
                  />
                  <Chart
                    chartType="Bar"
                    width={`${75 * chartData1?.length}px`}
                    height="300px"
                    data={chartData1 || ['', '', '']}
                    options={chartOptions}
                  />
                </div>
              </div>
            </div>
          </OverviewCard>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 max-w-3xl xl:max-w-none">
            {/* Income Analytic */}
            <OverviewCard
              title="Income"
              wrapperClassName="mb-8"
              Header={
                <CardHeader
                  onButtonClick={() => {
                    setIsModalOpen(true)
                  }}
                  amount={dataByWeeks.inAmount}
                  label="Income"
                />
              }
              loading={chartData2?.length <= 0}
            >
              <div className="flex flex-col pb-6 space-y-16">
                <div className="flex flex-col">
                  <ChartLegends
                    legends={dataByCategory?.data
                      ?.filter((d) => d.inAmount > 0)
                      ?.map((d, i) => ({
                        label: d.category_name,
                        color: `bg-${chartColors[i].slice(1)}`,
                      }))}
                  />
                  <Chart
                    chartType="PieChart"
                    width="100%"
                    height="300px"
                    data={chartData2 || ['', '', '']}
                    options={chartOptions2}
                  />
                </div>
              </div>
            </OverviewCard>

            {/* Expense Analytic */}
            <OverviewCard
              title="Expense"
              wrapperClassName="mb-8"
              Header={
                <CardHeader
                  onButtonClick={() => {
                    setIsModalOpen(true)
                  }}
                  amount={dataByWeeks.outAmount}
                  label="Expense"
                />
              }
              loading={chartData3?.length <= 0}
            >
              <div className="flex flex-col pb-6 space-y-16">
                <div className="flex flex-col">
                  <ChartLegends
                    legends={dataByCategory?.data
                      ?.filter((d) => d.outAmount > 0)
                      ?.map((d, i) => ({
                        label: d.category_name,
                        color: `bg-${chartColors[i].slice(1)}`,
                      }))}
                  />
                  <Chart
                    chartType="PieChart"
                    width="100%"
                    height="300px"
                    data={chartData3 || ['', '', '']}
                    options={chartOptions2}
                  />
                </div>
              </div>
            </OverviewCard>
          </div>
        </div>

        <MyModal
          onClose={() => {
            setIsModalOpen(false)
          }}
          show={isModalOpen}
        >
          <div></div>
        </MyModal>
      </div>
    </AppLayout>
  )
}

export default TransactionAnalyticsPage
