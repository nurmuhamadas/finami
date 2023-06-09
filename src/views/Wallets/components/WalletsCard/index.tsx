import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import cn from 'classnames'

import MyButton from 'components/MyButton'
import { formatCurrencySign } from 'utils/helpers/formatter'

import { type WalletsCardProps } from './types'

const WalletsCard = ({
  wallets,
  showAction,
  onDeleteClick,
  onEditClick,
}: WalletsCardProps) => {
  return (
    <ul className="flex flex-col">
      <li className="flex space-x-4 border-b-2 border-gray-200 py-3">
        <div className="flex w-full flex-col space-y-2">
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold">Total balance</span>
            <span className="text-lg font-semibold text-gray-600">
              {formatCurrencySign(wallets.total || 0)}
            </span>
          </div>
        </div>
      </li>
      {wallets?.data?.map((d) => (
        <li
          key={d.id}
          className="flex items-center justify-between space-x-4 py-3"
        >
          <div className="flex w-full flex-col space-y-2">
            <div className="flex w-full items-center justify-between">
              <span className="text-gray-700">{d.name}</span>
              <span className="font-semibold text-gray-600">
                {formatCurrencySign(d.balance)}
              </span>
            </div>
            <div
              className={cn('ml-auto mt-2 flex space-x-2', {
                hidden: !showAction,
              })}
            >
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
                onClick={() => {
                  onDeleteClick(d)
                }}
                colorType="danger"
                className="group"
              >
                <AiOutlineDelete />
              </MyButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default WalletsCard
