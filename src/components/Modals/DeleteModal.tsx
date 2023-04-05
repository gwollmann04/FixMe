import { Button, Modal } from 'antd'
import { Dispatch, SetStateAction } from 'react'

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteModal = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        title="Adicionar empresa"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            style={{ color: '#cdcdcd', background: '#001529', fontSize: '16px' }}
          >
            Adicionar
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default DeleteModal
