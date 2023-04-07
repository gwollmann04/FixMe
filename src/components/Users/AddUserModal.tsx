import { Button, Modal, Input, Form, Spin } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'
import { createUserDataType } from '@/src/@types/users'

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const AddUserModal = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({
    name,
    companyName,
    unitName,
    email,
  }: createUserDataType) => {
    setIsLoading(true)
    formRef.current?.resetFields()
    try {
      await api.post('/units', { name, companyName, unitName, email })
      toast.success('Usuário criado com sucesso.')
    } catch {
      toast.error('Erro ao criar usuário, tente novamente.')
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Adicionar usuário"
      open={isModalOpen}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      footer={[]}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off"
          ref={formRef}
        >
          <Form.Item
            label="Nome"
            name="name"
            style={{ maxWidth: '100%' }}
            rules={[{ required: true, message: 'Insira o nome da unidade' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nome da empresa"
            name="companyName"
            style={{ maxWidth: '100%' }}
            rules={[{ required: true, message: 'Insira o nome da empresa' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nome da unidade"
            name="unitName"
            style={{ maxWidth: '100%' }}
            rules={[{ required: true, message: 'Insira o nome da unidade' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            style={{ maxWidth: '100%' }}
            rules={[{ required: true, message: 'Insira o email' }]}
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

export default AddUserModal
