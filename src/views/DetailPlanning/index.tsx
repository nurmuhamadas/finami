import { AiOutlineArrowLeft } from 'react-icons/ai'

import Link from 'next/link'
import { useRouter } from 'next/router'

import useGetPlanningById from 'data/api/plannings/useGetPlanningById'
import { type CreatePlanningPayload } from 'data/types'

import AppLayout from 'components/AppLayout'
import MyButton from 'components/MyButton'
import { PAGES_URL } from 'utils/constants/pages'
import PlanningForm from 'views/NewPlanning/component/Form'

const NewPlanningPage = () => {
  const router = useRouter()
  const query = router.query as Record<string, string>

  const data = useGetPlanningById({ id: query?.id })

  const handleSubmit = (values: CreatePlanningPayload) => {
    console.log(values)
  }

  return (
    <AppLayout description="Don't let your money flow with no purpose. Plan it!">
      <div className="flex w-full flex-col space-y-8 max-w-4xl">
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
        <PlanningForm
          onSubmit={handleSubmit}
          initialData={data}
          disableForm={!data?.is_owner}
        />
      </div>
    </AppLayout>
  )
}

export default NewPlanningPage
