import React from 'react'

import { Modal } from 'flowbite-react'

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
    <MyModal show={show} onClose={onClose} position="top-center">
      <Modal.Header>Delete confirmation</Modal.Header>
      <Modal.Body>
        <p>
          All transaction related to {walletName} wallet will be deleted. Are
          you sure?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end">
          <MyButton colorType="danger" onClick={onDelete}>
            Delete
          </MyButton>
        </div>
      </Modal.Footer>
    </MyModal>
  )
}

export default ModalDelete
