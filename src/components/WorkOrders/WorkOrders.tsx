import { useCallback, useEffect, useState } from 'react'
import { Typography, Row, Col, Spin, Table } from 'antd'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { PlusCircleFilled } from '@ant-design/icons'

import { api } from '@/src/providers/api'
import { AddWorkOrderModal } from '@/src/components'
import {
  convertArrayToObject,
  handlePriority,
  handleStatus,
} from '@/src/utils/formatters'
import {
  FormattedWorkOrderDataType,
  WorkOrderDataType,
} from '@/src/@types/workorders'
import type { ColumnsType } from 'antd/es/table'
import { unstable_batchedUpdates } from 'react-dom'
import { AssetsDataType } from '@/src/@types/assets'

const columns: ColumnsType<WorkOrderDataType> = [
  {
    title: 'Equipamento',
    dataIndex: 'assetName',
    key: 'assetName',
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
    title: 'Título',
    dataIndex: 'title',
    key: 'title',
    responsive: ['md'],
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
    dataIndex: 'status',
    key: 'status',
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
    title: 'Usuários',
    dataIndex: 'numberOfUsers',
    key: 'numberOfUsers',
    responsive: ['md'],
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
    title: 'Prioridade',
    dataIndex: 'priority',
    key: 'priority',
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

const WorkOrders = () => {
  const [data, setData] = useState<Array<FormattedWorkOrderDataType>>()
  const [assets, setAssets] = useState<Array<AssetsDataType>>()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/workorders')
      const responseAssets = await api.get('/assets')
      console.log(responseAssets)

      const formattedAssets = convertArrayToObject(responseAssets.data, 'id')

      const formattedWorkOrders = data.map((workOrder: WorkOrderDataType) => ({
        ...workOrder,
        status: handleStatus(workOrder?.status),
        numberOfUsers: workOrder?.assignedUserIds.length,
        priority: handlePriority(workOrder?.priority),
        assetName: formattedAssets[workOrder.assetId],
      }))
      unstable_batchedUpdates(() => {
        setData(formattedWorkOrders)
        setAssets(responseAssets.data)
      })
    } catch {
      toast.error('Falha ao carregar as ordens de serviço.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (isLoading) return <Spin size="large" />

  return (
    <>
      <Typography
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'absolute',
          right: '10px',
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
        Nova Ordem <PlusCircleFilled style={{ marginLeft: '6px' }} />
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
          Ordens de Serviço
        </Typography>
        <Row justify="center">
          <Table
            style={{
              boxShadow: '1px 1px 8px 1px #000000',
              margin: '0px 10px',
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  router.push(`/work-orders/${record?.id}`)
                },
              }
            }}
            pagination={{ hideOnSinglePage: true }}
            columns={columns}
            dataSource={data}
          />
        </Row>
      </Col>

      <AddWorkOrderModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        assets={assets as Array<AssetsDataType>}
      />
    </>
  )
}

export default WorkOrders
