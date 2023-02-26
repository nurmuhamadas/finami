import { AiOutlinePlus } from 'react-icons/ai'

import Link from 'next/link'

import dayjs from 'dayjs'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import MyDatePicker from 'components/MyDatePicker'
import OverviewCard from 'components/OverviewCard'
import { PAGES_URL } from 'utils/constants/pages'
import { groupPlanningsByUser } from 'utils/helpers/helper'

import PlanningCard from './components/PlanningCard'

const plannings = [
  {
    id: 'plan-2',
    expense: 200000,
    planning: 180000,
    category_name: 'Category 1',
    user_id: 'user-1',
    user_name: 'User 1',
  },
  {
    id: 'plan-2',
    expense: 100000,
    planning: 120000,
    category_name: 'Category 2',
    user_id: 'user-2',
    user_name: 'User 2',
  },
  {
    id: 'plan-3',
    expense: 250000,
    planning: 175000,
    category_name: 'Category 2',
    user_id: 'user-1',
    user_name: 'User 1',
  },
  {
    id: 'plan-4',
    expense: 300000,
    planning: 300000,
    category_name: 'Category 2',
    user_id: 'user-2',
    user_name: 'User 2',
  },
]

const PlanningsPage = () => {
  return (
    <AppLayout
      title="Plannings"
      description="Don't let your money flow with no purpose. Plan it!"
    >
      <div className="flex w-full flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MyDatePicker
              onChange={() => {
                console.log('ok')
              }}
              disabledDates={[
                {
                  startDate: '1950-01-01',
                  endDate: dayjs().startOf('months').format('YYYY-MM-DD'),
                },
              ]}
              displayFormat="MMM YYYY"
            />
          </div>
          <div className="flex justify-end items-center">
            <Link href={PAGES_URL.plannings_new} passHref>
              <MyButton colorType="primary">
                <AiOutlinePlus />
              </MyButton>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={PAGES_URL.plannings_analytics} passHref>
              <MyButton colorType="primary">View Analytic</MyButton>
            </Link>
          </div>
          <div className="flex justify-end items-center" />
        </div>
        <div className="grid max-w-4xl space-y-8">
          {groupPlanningsByUser(plannings).map((_data) => (
            <OverviewCard
              key={_data[0].user_id}
              title={_data[0].user_name}
              cardClassName="planning-card-btn"
            >
              <div className="">
                <ul className="space-y-2">
                  {_data.map((d) => (
                    <PlanningCard key={d.id} data={d} onClick={() => ''} />
                  ))}
                </ul>
              </div>
            </OverviewCard>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default PlanningsPage
