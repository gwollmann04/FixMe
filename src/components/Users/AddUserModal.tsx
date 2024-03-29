import { Button, Modal, Input, Form, Spin, Select } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'
import { createUserDataType } from '@/src/@types/users'
import { CompanyDataType } from '@/src/@types/companies'
import { UnitDataType } from '@/src/@types/units'

const { Option } = Select

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  companies: Array<CompanyDataType>
  units: Array<UnitDataType>
}

const AddUserModal = ({
  isModalOpen,
  setIsModalOpen,
  companies,
  units,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({
    name,
    companyId,
    unitId,
    email,
  }: createUserDataType) => {
    setIsLoading(true)
    formRef.current?.resetFields()
    try {
      await api.post('/users', { name, companyId, unitId, email })
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
            style={{ maxWidth: '100%' }}
            name="companyId"
            label="Nome da empresa"
            rules={[{ required: true, message: 'Escolha a empresa' }]}
          >
            <Select placeholder="Selecione a empresa" allowClear>
              {companies?.map((company: CompanyDataType) => (
                <Option key={company?.id} value={company?.id}>
                  {company?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ maxWidth: '100%' }}
            name="unitId"
            label="Nome da unidade"
            rules={[{ required: true, message: 'Escolha a unidade' }]}
          >
            <Select placeholder="Selecione a unidade" allowClear>
              {units?.map((unit: CompanyDataType) => (
                <Option key={unit?.id} value={unit?.id}>
                  {unit?.name}
                </Option>
              ))}
            </Select>
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
