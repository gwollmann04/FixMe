import { Button, Modal, Input, Form, Spin, Select } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { toast } from 'react-toastify'

import { api } from '@/src/providers/api'
import { assetStatus } from '@/src/utils/constants'
import {
  FormattedAssetsDataType,
  createAssetDataType,
} from '@/src/@types/assets'
import { CompanyDataType } from '@/src/@types/companies'
import { UnitDataType } from '@/src/@types/units'

const { Option } = Select

interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  companies: Array<CompanyDataType>
  units: Array<UnitDataType>
  id: string
  userData: FormattedAssetsDataType
}

const EditAssetModal = ({
  isModalOpen,
  setIsModalOpen,
  companies,
  id,
  units,
  userData,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onFinish = async ({
    name,
    status,
    model,
    unitId,
    companyId,
    healthScore,
  }: createAssetDataType) => {
    setIsLoading(true)
    formRef.current?.resetFields()
    try {
      await api.put(`/assets/${id}`, {
        name,
        status,
        model,
        unitId,
        companyId,
        healthScore,
      })
      toast.success('Equipamento editado com sucesso.')
    } catch {
      toast.error('Erro ao editar equipamento, tente novamente.')
    } finally {
      handleCloseModal()
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Editar equipamento"
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
            rules={[{ required: true, message: 'Insira o nome' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Modelo"
            name="model"
            initialValue={userData?.model}
            style={{ maxWidth: '100%' }}
            rules={[{ required: true, message: 'Insira o model' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Pontuação de saúde"
            name="healthScore"
            initialValue={userData?.healthscore}
            style={{ maxWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Insira o número de pontuação de saúde',
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            style={{ maxWidth: '100%' }}
            name="status"
            label="Status"
            initialValue={userData?.status}
            rules={[{ required: true, message: 'Defina o status' }]}
          >
            <Select placeholder="Selecione o status" allowClear>
              {assetStatus?.map((status) => (
                <Option key={status?.value} value={status?.value}>
                  {status?.label}
                </Option>
              ))}
            </Select>
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
            name="unitId"
            initialValue={userData?.unitId}
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
  )
}

export default EditAssetModal
