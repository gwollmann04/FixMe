import { Button, Modal, Input, Form, Spin } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'
import { UserDataFormattedType, createUserDataType } from '@/src/@types/users'

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  id: string
  userData: UserDataFormattedType
}

const EditUserModal = ({ isModalOpen, setIsModalOpen, id, userData }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({
    name,
    unitName,
    companyName,
    email
  }: createUserDataType) => {
    setIsLoading(true)

    formRef.current?.resetFields()
    try {
      await api.put(`/users/${id}`, { name, unitName, companyName, email })
      toast.success('Usuário editado com sucesso.')
    } catch {
      toast.error('Erro ao editar usuário, tente novamente.')
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal
        title="Editar usuário"
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
              initialValue={userData?.name}
              style={{ maxWidth: '100%' }}
              rules={[{ required: true, message: 'Insira o nome da unidade' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nome da empresa"
              initialValue={userData?.companyName}
              name="companyName"
              style={{ maxWidth: '100%' }}
              rules={[{ required: true, message: 'Insira o nome da empresa' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nome da unidade"
              initialValue={userData?.unitName}
              name="unitName"
              style={{ maxWidth: '100%' }}
              rules={[{ required: true, message: 'Insira o nome da unidade' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              initialValue={userData?.email}
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
                Editar
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  )
}

export default EditUserModal
