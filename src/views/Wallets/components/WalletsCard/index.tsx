import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import MyButton from 'components/MyButton'
import { formatCurrency } from 'utils/helpers/formatter'

import { type WalletsCardProps } from './types'

const WalletsCard = ({
  data,
  onDeleteClick,
  onEditClick,
}: WalletsCardProps) => {
  const total = data
    .map((d) => d.balance)
    .reduce((total, item) => Number(total || 0) + Number(item))

  return (
    <ul className="flex flex-col">
      <li className="flex space-x-4 border-b-2 border-gray-200 py-3">
        <div className="flex w-full flex-col space-y-2">
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold">Total balance</span>
            <span className="text-lg font-semibold text-gray-600">
              Rp {formatCurrency(total)}
            </span>
          </div>
        </div>
      </li>
      {data.map((d) => (
        <li
          key={d.id}
          className="flex items-center justify-between space-x-4 py-3"
        >
          <div className="flex w-full flex-col space-y-2">
            <div className="flex w-full items-center justify-between">
              <span className="text-gray-700">{d.name}</span>
              <span className="font-semibold text-gray-600">
                Rp {formatCurrency(d.balance)}
              </span>
            </div>
            <div className="ml-auto mt-2 flex space-x-2">
              <MyButton
                outline
                onClick={() => {
                  onEditClick(d)
                }}
                color="light"
              >
                <AiOutlineEdit className="text-gray-600" />
              </MyButton>
              <MyButton
                outline
                onClick={() => {
                  onDeleteClick(d)
                }}
                color="failure"
              >
                <AiOutlineDelete className="text-finamiRed" />
              </MyButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default WalletsCard
