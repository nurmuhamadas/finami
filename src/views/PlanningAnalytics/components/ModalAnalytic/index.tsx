import { Modal } from 'flowbite-react'

import MyModal from 'components/MyModal'
import PlanningCard from 'views/PlanningsPage/components/PlanningCard'

import { type ModalAnalyticProps } from './types'

const ModalAnalytic = ({ show, data, onClose }: ModalAnalyticProps) => {
  return (
    <MyModal onClose={onClose} show={show}>
      <Modal.Header>
        <div className="w-full flex items-center justify-between">
          <span className="text-lg font-semibold">
            {data?.[0]?.user_fullname} Planning and Expense
          </span>
        </div>
      </Modal.Header>
      <div className="w-full px-8 py-4 h-[70vh] overflow-y-auto finamiBlueScollY">
        <ul className="flex flex-col divide-y-2">
          {data?.map((d) => {
            return (
              <PlanningCard
                key={d.id}
                planning={d}
                expense={d.expense}
                showExpense
                wrapperClassName="py-4"
              />
            )
          })}
        </ul>
      </div>
    </MyModal>
  )
}

export default ModalAnalytic
