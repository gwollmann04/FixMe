import { Row, Typography, Col, Divider, Spin, Grid, Table } from 'antd'
import { ParsedUrlQuery } from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  CloseCircleFilled,
  CheckCircleFilled,
  EditOutlined,
} from '@ant-design/icons'

import { api } from '@/src/providers/api'
import { DeleteModal, EditWorkOrderModal } from '@/src/components'
import {
  convertArrayToObject,
  handleCheckListStatus,
  handlePriority,
  handleStatus,
} from '@/src/utils/formatters'
import {
  CheckListType,
  FormattedWorkOrderDataType,
} from '@/src/@types/workorders'
import type { ColumnsType } from 'antd/es/table'

const { useBreakpoint } = Grid

const columns: ColumnsType<CheckListType> = [
  {
    title: 'Tarefas',
    dataIndex: 'task',
    key: 'task',
    render(text) {
      return {
        props: {
          style: { background: '#cdcdcd', cursor: 'pointer' },
        },
        children: (
          <Typography style={{ color: '#001529', fontSize: '18px' }}>
            {text}
          </Typography>
        ),
      }
    },
  },
  {
    title: 'Status',
    dataIndex: 'completed',
    key: 'completed',
    render(text) {
      return {
        props: {
          style: { background: '#cdcdcd', cursor: 'pointer' },
        },
        children: (
          <Typography style={{ color: '#001529', fontSize: '18px' }}>
            {text}
          </Typography>
        ),
      }
    },
  },
]

const WorkOrderInternal = ({ id }: ParsedUrlQuery) => {
  const [data, setData] = useState<FormattedWorkOrderDataType>()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { xs } = useBreakpoint()

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/workorders/${id}`)

      const responseAssets = await api.get('/assets')

      const formattedAssets = convertArrayToObject(responseAssets.data, 'id')

      const workOrder = {
        ...data,
        status: handleStatus(data?.status),
        numberOfUsers: data?.assignedUserIds.length,
        priority: handlePriority(data?.priority),
        assetName: formattedAssets[data.assetId],
        checklist: data.checklist.map((item: CheckListType) => ({
          ...item,
          completed: handleCheckListStatus(Boolean(item.completed)),
        })),
      }

      setData(workOrder)
    } catch {
      toast.error('Falha ao carregar dados da ordem de serviço.')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (isLoading) return <Spin size="large" />

  return (
    <>
      <Typography
        onClick={() => setIsEditModalOpen(true)}
        style={{
          position: 'absolute',
          right: '95px',
          top: '86px',
          zIndex: '1',
          fontSize: '18px',
          background: '#001529',
          borderRadius: '10px',
          padding: '2px 4px',
          cursor: 'pointer',
          display: 'flex',
        }}
      >
        Editar <EditOutlined style={{ marginLeft: '6px' }} />
      </Typography>
      <Typography
        onClick={() => setIsDeleteModalOpen(true)}
        style={{
          position: 'absolute',
          right: '5px',
          top: '86px',
          zIndex: '1',
          fontSize: '18px',
          background: '#001529',
          borderRadius: '10px',
          padding: '2px 4px',
          cursor: 'pointer',
          display: 'flex',
        }}
      >
        Excluir <CloseCircleFilled style={{ marginLeft: '6px' }} />
      </Typography>
      <Col style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography
          color="#001529"
          style={{
            fontSize: '30px',
            padding: '10px 0px',
            marginTop: '20px',
          }}
        >
          {data?.title}
        </Typography>
        <Row justify="center" align="middle">
          <Col
            style={{
              padding: '12px',
              textAlign: 'start',
            }}
          >
            <Typography style={{ justifyContent: 'flex-start' }}>
              Descrição: <Typography>{data?.title}</Typography>
            </Typography>
            <Divider />
            <Typography style={{ justifyContent: 'flex-start' }}>
              Nº de usuários: <Typography>{data?.numberOfUsers}</Typography>
            </Typography>
            <Divider />
            <Typography style={{ justifyContent: 'flex-start' }}>
              Prioridade: <Typography>{data?.priority}</Typography>
            </Typography>
            <Divider />
            <Typography style={{ justifyContent: 'flex-start' }}>
              Status:{' '}
              <Typography>
                {data?.status}{' '}
                {data?.status === 'Concluído' ? (
                  <CheckCircleFilled />
                ) : (
                  <CloseCircleFilled />
                )}
              </Typography>
            </Typography>
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Table
            style={{
              boxShadow: '1px 1px 8px 1px #000000',
              margin: '0px 10px',
              maxWidth: '400px',
            }}
            pagination={{ hideOnSinglePage: true }}
            columns={columns}
            dataSource={data?.checklist}
          />
        </Row>
      </Col>
      <EditWorkOrderModal
        setIsModalOpen={setIsEditModalOpen}
        isModalOpen={isEditModalOpen}
        id={String(id)}
        userData={data as FormattedWorkOrderDataType}
      />
      <DeleteModal
        setIsModalOpen={setIsDeleteModalOpen}
        isModalOpen={isDeleteModalOpen}
        modalTitle="ordem de serviço"
        url={`/workorders/${id}`}
      />
    </>
  )
}

export default WorkOrderInternal
