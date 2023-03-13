import React from 'react'

import MyButton from 'components/MyButton'
import MyModal from 'components/MyModal'

import { type ModalDeleteProps } from './types'

const ModalDelete = ({
  onDelete,
  show,
  onClose,
  walletName,
}: ModalDeleteProps) => {
  return (
    <MyModal
      show={show}
      onClose={onClose}
      position="top-center"
      header="Delete confirmation"
      footer={
        <div className="flex w-full justify-end">
          <MyButton colorType="danger" onClick={onDelete}>
            Delete
          </MyButton>
        </div>
      }
    >
      <p>
        All transaction and planning related to {walletName} wallet will be
        deleted. Are you sure?
      </p>
    </MyModal>
  )
}

export default ModalDelete
