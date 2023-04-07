import { Button, Modal, Input, Form, Spin } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'
import { createCompanyDataType } from '@/src/@types/companies'
import { UnitDataFormattedType } from '@/src/@types/units'

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  id: string
  unitData: UnitDataFormattedType
}

const EditUnitModal = ({
  isModalOpen,
  setIsModalOpen,
  id,
  unitData,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({ name }: createCompanyDataType) => {
    setIsLoading(true)

    formRef.current?.resetFields()
    try {
      await api.put(`/units/${id}`, { name })
      toast.success('Unidade editada com sucesso.')
    } catch {
      toast.error('Erro ao editar unidade, tente novamente.')
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal
        title="Editar unidade"
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
              initialValue={unitData?.name}
              style={{ maxWidth: '100%' }}
              rules={[{ required: true, message: 'Insira o nome da unidade' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nome da empresa"
              name="companyName"
              initialValue={unitData?.companyName}
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
                Editar
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  )
}

export default EditUnitModal
