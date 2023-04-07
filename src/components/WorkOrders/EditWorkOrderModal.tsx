import { Button, Modal, Input, Form, Spin, Select } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'
import { FormattedWorkOrderDataType, editWorkOrderDataType } from '@/src/@types/workorders'
import { prioritys, workOrderStatus } from '@/src/utils/constants'

const { Option } = Select
interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  id: string
  userData: FormattedWorkOrderDataType
}

const EditWorkOrderModal = ({
  isModalOpen,
  setIsModalOpen,
  id,
  userData
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({
    description,
    priority,
    status,
  }: editWorkOrderDataType) => {
    setIsLoading(true)

    formRef.current?.resetFields()
    try {
      await api.put(`/workorders/${id}`, { description, priority, status })
      toast.success('Ordem de serviço editado com sucesso.')
    } catch {
      toast.error('Erro ao editar ordem de serviço, tente novamente.')
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal
        title="Editar ordem de serviço"
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
              label="Descrição"
              name="description"
              initialValue={userData?.description}
              style={{ maxWidth: '100%' }}
              rules={[{ required: true, message: 'Insira a descrição' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ maxWidth: '100%' }}
              name="priority"
              initialValue={userData?.priority}
              label="Prioridade"
              rules={[{ required: true, message: 'Defina a prioridade' }]}
            >
              <Select placeholder="Selecione a prioridade" allowClear>
                {prioritys?.map((priority) => (
                  <Option key={priority?.value} value={priority?.value}>
                    {priority?.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ maxWidth: '100%' }}
              name="status"
              initialValue={userData?.status}
              label="Status"
              rules={[{ required: true, message: 'Defina o status' }]}
            >
              <Select placeholder="Selecione o status" allowClear>
                {workOrderStatus?.map((status) => (
                  <Option key={status?.value} value={status?.value}>
                    {status?.label}
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
                Editar
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  )
}

export default EditWorkOrderModal
