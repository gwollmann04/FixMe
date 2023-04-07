import { Button, Col, Modal, Spin, Typography } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  modalTitle: string
  url: string
}

const DeleteModal = ({
  isModalOpen,
  setIsModalOpen,
  modalTitle,
  url,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await api.delete(url)
      toast.success('Exclusão concluída com sucesso.')
    } catch {
      toast.error('Erro ao efetuar exclusão, tente novamente.')
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title={`Excluir ${modalTitle}`}
      open={isModalOpen}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      footer={[]}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <Typography style={{ color: '#001529', fontSize: '20px' }}>
            Deseja efetuar a exclusão?
          </Typography>
          <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              key="back"
              onClick={handleCloseModal}
              style={{ marginRight: '8px' }}
            >
              Cancelar
            </Button>
            <Button
              type="primary"
              onClick={handleDelete}
              style={{
                color: '#cdcdcd',
                background: '#001529',
              }}
            >
              Excluir
            </Button>
          </Col>
        </>
      )}
    </Modal>
  )
}

export default DeleteModal
