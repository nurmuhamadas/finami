import { useEffect, useMemo, useState } from 'react'
import { Chart } from 'react-google-charts'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

import dayjs from 'dayjs'
import { Alert } from 'flowbite-react'

import useGetPlannings from 'data/api/plannings/useGetPlannings'
import useGetTransactions from 'data/api/Transactions/useGetTransactions'
import { type GetPlanningsQuery, type PlanningDataResponse } from 'data/types'

import AppLayout from 'components/AppLayout'
import ChartLegends from 'components/ChartLegends'
import MyButton from 'components/MyButton'
import OverviewCard from 'components/OverviewCard'
import { PAGES_URL, QUERY_URL } from 'utils/constants/pages'
import { type ChartDataType, formatDataToBarChart } from 'utils/helpers/chart'
import { groupPlanningsByUser } from 'utils/helpers/helper'

import { chartOptions } from './consts'

const ModalAnalytic = dynamic(
  async () => await import('./components/ModalAnalytic'),
)

const pq = QUERY_URL.plannings

const PlanningAnalyticsPage = () => {
  const router = useRouter()
  const query = router.query as Record<string, string>

  const [filter, setFilter] = useState<GetPlanningsQuery>({
    start_month: dayjs(query?.[pq.month]).toDate(),
    end_month: dayjs(query?.[pq.month]).toDate(),
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setselectedData] = useState([])

  const { data: plannings } = useGetPlannings(filter)
  const { data: transactions } = useGetTransactions({
    ...filter,
    transaction_type: 'out',
    start_date: dayjs(filter.start_month).startOf('month').toDate(),
    end_date: dayjs(filter.end_month).endOf('month').toDate(),
  })

  const { data, planTransactions } = useMemo(() => {
    if (plannings && transactions) {
      const _p = groupPlanningsByUser(plannings)
      const _chartData: Array<{
        userName: string
        userId: string
        charts: ChartDataType
        isOverLimit: boolean
      }> = []
      const planTransactions: Array<
        PlanningDataResponse & { expense: number }
      > = []

      _p?.forEach((d) => {
        let isOverLimit = false
        const _d = d?.map((p) => {
          const tr = transactions?.find(
            (t) =>
              t.user_id === p.user_id &&
              t.category_id === p.category_id &&
              t.transaction_type === 'out',
          )

          if (p.amount < tr?.amount) isOverLimit = true

          return {
            ...p,
            expense: tr?.amount || 0,
          }
        })

        planTransactions.push(..._d)
        _chartData.push({
          userName: _d[0].user_fullname,
          userId: _d[0].user_id,
          isOverLimit,
          charts: formatDataToBarChart(_d, {
            legendLabels: ['Planning', 'Expense'],
            xAxisKey: 'category_name',
            yAxisKey: ['amount', 'expense'],
            xAxisLabel: '',
          }),
        })
      })

      return {
        data: _chartData,
        planTransactions,
      }
    }

    return {}
  }, [plannings, transactions])

  useEffect(() => {
    if (query) {
      setFilter({
        ...filter,
        category_id: query?.[pq.category_id],
        child_id: query?.[pq.user_id],
        wallet_id: query?.[pq.wallet_id],
        start_month: dayjs(query?.[pq.month]).isValid()
          ? dayjs(query?.[pq.month]).toDate()
          : dayjs().toDate(),
        end_month: dayjs(query?.[pq.month]).isValid()
          ? dayjs(query?.[pq.month]).toDate()
          : dayjs().toDate(),
      })
    }
  }, [query])

  const onDetailClicked = ([value]: typeof data) => {
    const _d = planTransactions.filter((d) => d.user_id === value.userId)
    setselectedData(_d)
    setIsModalOpen(true)
  }

  return (
    <AppLayout description="Analyze your transaction and budget. Don't let it over the limit!">
      <div className="flex w-full flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href={{
                pathname: PAGES_URL.plannings.url,
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

        <div className="flex w-full flex-col space-y-8 max-w-3xl">
          {data?.map((d) => (
            <OverviewCard
              key={JSON.stringify(d)}
              title={d.userName}
              Header={
                <div className="flex flex-col-reverse justify-between items-end sm:flex-row sm:items-center gap-4">
                  {d.isOverLimit ? (
                    <Alert color="failure" className="w-full max-w-md">
                      <span>You have planning that exceeded the limit!</span>
                    </Alert>
                  ) : (
                    <div />
                  )}
                  <MyButton
                    onClick={() => {
                      onDetailClicked([d])
                    }}
                    colorType="primary"
                    className="w-max"
                  >
                    Detail
                  </MyButton>
                </div>
              }
            >
              <div className="flex flex-col pb-6 space-y-16 overflow-auto">
                <div className="flex w-full overflow-x-auto py-4 pb-6 finamiBlueScollX">
                  <div className="flex flex-col">
                    <ChartLegends
                      legends={[
                        { color: 'bg-finamiBlue', label: 'Planning' },
                        { color: 'bg-finamiBlueSecondary', label: 'Expense' },
                      ]}
                    />
                    <Chart
                      chartType="Bar"
                      width={`${
                        d.charts?.length > 5 ? 100 * d.charts?.length : 400
                      }px`}
                      height="300px"
                      data={d.charts}
                      options={chartOptions}
                    />
                  </div>
                </div>
              </div>
            </OverviewCard>
          ))}
        </div>

        <ModalAnalytic
          show={!!isModalOpen}
          onClose={() => {
            setIsModalOpen(undefined)
            setselectedData([])
          }}
          title={`asdad`}
          data={selectedData}
        />
      </div>
    </AppLayout>
  )
}

export default PlanningAnalyticsPage
