import { Button, Modal, Input, Form, Spin, Select } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'
import { UserDataFormattedType, createUserDataType } from '@/src/@types/users'
import { CompanyDataType } from '@/src/@types/companies'
import { UnitDataType } from '@/src/@types/units'

const { Option } = Select
interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  id: string
  userData: UserDataFormattedType
  companies: Array<CompanyDataType>
  units: Array<UnitDataType>
}

const EditUserModal = ({
  isModalOpen,
  setIsModalOpen,
  id,
  userData,
  units,
  companies,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({
    name,
    unitId,
    companyId,
    email,
  }: createUserDataType) => {
    setIsLoading(true)

    formRef.current?.resetFields()
    try {
      await api.put(`/users/${id}`, { name, unitId, companyId, email })
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
              style={{ maxWidth: '100%' }}
              name="companyId"
              initialValue={userData?.companyId}
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
              initialValue={userData?.unitId}
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
