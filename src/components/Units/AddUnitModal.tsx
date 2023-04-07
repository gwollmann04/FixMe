import { Button, Modal, Input, Form, Spin, Select } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

const { Option } = Select

import { api } from '@/src/providers/api'
import { createUnitDataType } from '@/src/@types/units'
import { CompanyDataType } from '@/src/@types/companies'

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  companies: Array<CompanyDataType>
}

const AddUnitModal = ({ isModalOpen, setIsModalOpen,companies }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({ name, companyId }: createUnitDataType) => {
    setIsLoading(true)
    formRef.current?.resetFields()
    try {
      await api.post('/units', { name, companyId })
      toast.success('Unidade criada com sucesso.')
    } catch {
      toast.error('Erro ao criar unidade, tente novamente.')
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Adicionar unidade"
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

export default AddUnitModal
