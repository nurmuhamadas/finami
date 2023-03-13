import { useEffect, useMemo, useState } from 'react'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'

import Link from 'next/link'
import { useRouter } from 'next/router'

import dayjs from 'dayjs'
import { TextInput } from 'flowbite-react'

import useGetPlannings from 'data/api/plannings/useGetPlannings'
import { type GetPlanningsQuery } from 'data/types'

import AppLayout from 'components/AppLayout'
import EmptyList from 'components/EmptyList'
import Loader from 'components/Loader'
import MyButton from 'components/MyButton'
import MyDatePicker from 'components/MyDatePicker'
import OverviewCard from 'components/OverviewCard'
import { useAuth } from 'contexts/AuthContext'
import { PAGES_URL, QUERY_URL } from 'utils/constants/pages'
import { debounce, groupPlanningsByUser } from 'utils/helpers/helper'
import FilterTransactions from 'views/Transactions/components/filter'

import PlanningCard from './components/PlanningCard'

const pq = QUERY_URL.plannings

const PlanningsPage = () => {
  const router = useRouter()
  const { user } = useAuth()
  const orgQuery = router.query as Record<string, string>

  const [isAfterInit, setIsAfterInit] = useState(false)

  const [filter, setFilter] = useState<GetPlanningsQuery>({
    start_month: dayjs(orgQuery?.[pq.month]).toDate(),
    end_month: dayjs(orgQuery?.[pq.month]).toDate(),
  })
  const { data, isLoading } = useGetPlannings(filter, { enabled: isAfterInit })
  const groupedPlans = useMemo(() => {
    if (data) {
      return groupPlanningsByUser(data)
    }
  }, [data])

  const query = useMemo(() => {
    const _f: Record<string, string> = {}
    if (filter?.end_month) _f[pq.month] = filter?.end_month?.toISOString()
    if (filter?.category_id) _f[pq.category_id] = filter?.category_id
    if (filter?.user_id) _f[pq.user_id] = filter?.user_id
    if (filter?.wallet_id) _f[pq.wallet_id] = filter?.wallet_id
    if (filter?.search_key) _f[pq.search_key] = filter?.search_key
    return _f
  }, [filter])

  useEffect(() => {
    if (orgQuery) {
      setFilter({
        ...filter,
        category_id: orgQuery?.[pq.category_id],
        user_id: orgQuery?.[pq.user_id],
        wallet_id: orgQuery?.[pq.wallet_id],
        start_month: dayjs(orgQuery?.[pq.month]).isValid()
          ? dayjs(orgQuery?.[pq.month]).startOf('month').toDate()
          : dayjs().toDate(),
        end_month: dayjs(orgQuery?.[pq.month]).isValid()
          ? dayjs(orgQuery?.[pq.month]).endOf('month').toDate()
          : dayjs().toDate(),
      })
    }
    setIsAfterInit(true)
  }, [orgQuery])

  return (
    <AppLayout description="Don't let your money flow with no purpose. Plan it!">
      <div className="flex w-full flex-col space-y-8">
        <FilterTransactions
          initialValues={{
            child_id: filter.user_id,
            category_id: filter.category_id,
            wallet_id: filter.wallet_id,
          }}
          onChange={(v) => {
            setFilter({
              ...filter,
              user_id: v.child_id,
              category_id: v.category_id,
              wallet_id: v.wallet_id,
            })
          }}
          hide={{ date: true, type: true }}
          startComponent={
            <div className="flex items-center gap-2 w-full flex-wrap">
              <MyDatePicker
                onChange={(v) => {
                  setFilter((f) => ({
                    ...f,
                    start_month: (v as Date) || undefined,
                    end_month: (v as Date) || undefined,
                  }))
                }}
                displayFormat="MMM YYYY"
                containerClassName="w-full sm:!w-60"
                initialValue={{
                  startDate: filter.start_month,
                  endDate: filter.end_month,
                }}
              />
              <TextInput
                id="searchkey"
                placeholder="Search..."
                className="finamiInput w-full sm:w-80"
                rightIcon={AiOutlineSearch}
                onChange={debounce((e) => {
                  if (e) {
                    setFilter((f) => ({
                      ...f,
                      search_key: e.target.value,
                    }))
                  } else {
                    setFilter((f) => ({
                      ...f,
                      search_key: undefined,
                    }))
                  }
                })}
              />
            </div>
          }
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href={{
                pathname: PAGES_URL.plannings_analytics.url,
                query,
              }}
              passHref
            >
              <MyButton
                color="light"
                className="!text-gray-500 hover:!bg-finamiBlue hover:!text-white !text-sm"
              >
                View Analytic
              </MyButton>
            </Link>
          </div>
          <div className="flex justify-end items-center">
            <MyButton
              colorType="primary"
              disabled={dayjs(filter.start_month).isBefore(
                dayjs().startOf('month'),
              )}
              onClick={async () => {
                await router.push(
                  {
                    pathname: PAGES_URL.plannings_new.url,
                    query,
                  },
                  PAGES_URL.plannings_new.url,
                )
              }}
            >
              <AiOutlinePlus />
            </MyButton>
          </div>
        </div>
        <div className="grid max-w-4xl space-y-8">
          {isLoading && <Loader />}

          {groupedPlans?.length === 0 && <EmptyList />}

          {groupedPlans.map((_data) => {
            const title =
              _data[0].user_id === user?.id
                ? 'My Plans'
                : `${_data[0].user_fullname}'s plans`
            return (
              <OverviewCard
                key={_data[0].user_id}
                title={title}
                cardClassName="planning-card-btn"
              >
                <div className="">
                  <ul className="space-y-2">
                    {_data.map((d) => {
                      return (
                        <PlanningCard
                          key={d.id}
                          planning={d}
                          showInfo
                          onClick={async () => {
                            await router.push(
                              `${PAGES_URL.plannings.url}/${d.id}`,
                            )
                          }}
                        />
                      )
                    })}
                  </ul>
                </div>
              </OverviewCard>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}

export default PlanningsPage
