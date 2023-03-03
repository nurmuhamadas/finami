import { Modal } from 'flowbite-react'

import { type TransactionDataResponse } from 'data/types'

import MyModal from 'components/MyModal'
import TransactionListItem from 'components/TransactionListItem'
import { type ChartDataType } from 'utils/helpers/chart'
import { formatCurrency, formatCurrencySign } from 'utils/helpers/formatter'
import { type GroupTransactionByCategoryResult } from 'utils/helpers/helper'

import { type ModalAnalyticProps } from './types'

const ModalAnalytic = ({
  title,
  show,
  modalType,
  data,
  onClose,
}: ModalAnalyticProps) => {
  return (
    <MyModal onClose={onClose} show={show}>
      <Modal.Header>
        <div className="w-full flex items-center justify-between">
          <span className="text-lg font-semibold">{title}</span>
        </div>
      </Modal.Header>
      <div className="w-full px-8 py-4 h-[70vh] overflow-y-auto finamiBlueScollY">
        <ul className="flex flex-col divide-y-2">
          {['expense', 'income'].includes(modalType) &&
            (data as GroupTransactionByCategoryResult).data
              ?.filter(
                (d) =>
                  (modalType === 'expense' &&
                    d.data[0].transaction_type === 'out') ||
                  (modalType === 'income' &&
                    d.data[0].transaction_type === 'in'),
              )
              .map((d) => {
                let c: TransactionDataResponse
                d.data.forEach((_d) => {
                  c = {
                    ..._d,
                    amount: Number(c?.amount || 0) + Number(_d.amount || 0),
                  }
                })
                return (
                  <TransactionListItem
                    key={JSON.stringify(d)}
                    className="py-4"
                    data={c}
                    showDate
                  />
                )
              })}

          {modalType === 'summary' &&
            (data as ChartDataType)?.slice(1).map((d) => {
              const [date, income, expense] = d
              const total = Number(income || 0) - Number(expense || 0)

              return (
                <div className="w-full flex flex-col py-4 space-y-2" key={date}>
                  <div className="flex items-center justify-between space-x-4">
                    <span className="font-semibold">{date}</span>
                    <span>{formatCurrencySign(total)}</span>
                  </div>
                  <div className="flex items-center justify-end space-x-4">
                    <div className="flex flex-col items-end justify-end space-y-1">
                      <span className="text-finamiGreen text-sm">
                        + Rp. {formatCurrency(income as number)}
                      </span>
                      <span className="text-finamiRed text-sm">
                        - Rp. {formatCurrency(expense as number)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
        </ul>
      </div>
    </MyModal>
  )
}

export default ModalAnalytic
