import React from 'react'

import { Modal } from 'flowbite-react'

const ModalDelete = () => {
  return (
    <Modal
      show={isOpenDeleteModal}
      onClose={() => {
        setSelectedWallet(null)
        setIsOpenDeleteModal(false)
      }}
      className="h-screen"
    >
      <Modal.Header>Delete confirmation</Modal.Header>
      <Modal.Body>
        <p>
          All transaction related to this wallet will be deleted. Are you sure?
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default ModalDelete
