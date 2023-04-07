import { Button, Modal, Input, Form, Spin } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'
import { createCompanyDataType } from '@/src/@types/companies'

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const AddCompanyModal = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({ name }: createCompanyDataType) => {
    setIsLoading(true)
    formRef.current?.resetFields()
    try {
      await api.post('/companies', { name })
      toast.success('Empresa criada com sucesso.')
    } catch {
      toast.error('Erro ao criar empresa, tente novamente.')
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Adicionar empresa"
      open={isModalOpen}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      footer={[]}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Form onFinish={onFinish} autoComplete="off" ref={formRef}>
          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            label="Nome"
            name="name"
            style={{ maxWidth: '100%' }}
            rules={[{ required: true, message: 'Insira o nome da empresa' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ justifyContent: 'flex-end', display: 'flex' }}>
            <Button
              key="back"
              onClick={handleCloseModal}
              style={{ marginRight: '8px' }}
            >
              Cancelar
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                color: '#cdcdcd',
                background: '#001529',
              }}
            >
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default AddCompanyModal
