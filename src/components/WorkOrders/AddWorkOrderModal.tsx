import { Button, Modal, Input, Form, Spin, Select } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'
import { prioritys } from '@/src/utils/constants'
import { createWorkOrderDataType } from '@/src/@types/workorders'
import { AssetsDataType } from '@/src/@types/assets'

const { Option } = Select

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  assets: Array<AssetsDataType>
}

const AddWorkOrderModal = ({ isModalOpen, setIsModalOpen, assets }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({
    description,
    title,
    priority,
    usersNumber,
    assetId,
  }: createWorkOrderDataType) => {
    setIsLoading(true)
    formRef.current?.resetFields()
    try {
      await api.post('/workorders', {
        description,
        title,
        priority,
        usersNumber,
        assetId,
      })
      toast.success('Ordem de serviço criada com sucesso.')
    } catch {
      toast.error('Erro ao criar ordem de serviço, tente novamente.')
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Adicionar ordem de serviço"
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
            label="Título"
            name="title"
            style={{ maxWidth: '100%' }}
            rules={[{ required: true, message: 'Insira o título' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Descrição"
            name="description"
            style={{ maxWidth: '100%' }}
            rules={[{ required: true, message: 'Insira a descrição' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nº de usuários"
            name="usersNumber"
            style={{ maxWidth: '100%' }}
            rules={[{ required: true, message: 'Insira o número de usuários' }]}
          >
            <Input type='number'/>
          </Form.Item>
          <Form.Item
            style={{ maxWidth: '100%' }}
            name="priority"
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
            name="assetId"
            label="Equipamento"
            rules={[{ required: true, message: 'Escolha o equipamento' }]}
          >
            <Select placeholder="Selecione a empresa" allowClear>
              {assets?.map((asset : AssetsDataType) => (
                <Option key={asset?.id} value={asset?.id}>
                  {asset?.name}
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

export default AddWorkOrderModal
