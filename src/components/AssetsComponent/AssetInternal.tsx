import { Row, Typography, Col, Divider, Spin, Image, Grid } from 'antd'
import { ParsedUrlQuery } from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CloseCircleFilled, EditOutlined } from '@ant-design/icons'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { api } from '@/src/providers/api'
import { DeleteModal, EditAssetModal } from '@/src/components'
import {
  convertArrayToObject,
  handleAssetModel,
  handleAssetStatus,
} from '@/src/utils/formatters'
import {
  FormattedAssetsDataType,
  HealthHistoryDataType,
} from '@/src/@types/assets'
import { unstable_batchedUpdates } from 'react-dom'
import { UnitDataType } from '@/src/@types/units'
import { CompanyDataType } from '@/src/@types/companies'

const { useBreakpoint } = Grid

const getOptions = (
  type: string,
  data: FormattedAssetsDataType,
  md: boolean,
) => ({
  chart: {
    type,
    width: md ? 500 : 300,
    height: 250,
    borderRadius: '12px',
  },
  title: {
    text: 'Distribuição do Status de Funcionamento',
  },
  series: [
    {
      type: 'pie',
      name: 'Nº de ocorrências',
      data: [
        ['Inativo', data?.inDowntimeNumber],
        ['Ativo', data?.inOperationNumber],
        ['Parada não planejada', data?.unplannedStopNumber],
        ['Em alerta', data?.inAlertNumber],
      ],
    },
  ],
})

const AssetInternal = ({ id }: ParsedUrlQuery) => {
  const [data, setData] = useState<FormattedAssetsDataType>()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [companies, setCompanies] = useState<Array<CompanyDataType>>()
  const [units, setUnits] = useState<Array<UnitDataType>>()

  const { md } = useBreakpoint()

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/assets/${id}`)
      const responseCompanies = await api.get('/companies')
      const responseUnits = await api.get('/units')
      let inAlertNumber = 0
      let inDowntimeNumber = 0
      let inOperationNumber = 0
      let unplannedStopNumber = 0

      data.healthHistory.map((item: HealthHistoryDataType) => {
        if (item.status === 'inAlert') return inAlertNumber++
        if (item.status === 'inDowntime') return inDowntimeNumber++
        if (item.status === 'inOperation') return inOperationNumber++
        if (item.status === 'unplannedStop') return unplannedStopNumber++
      })

      const companyNameArray = convertArrayToObject(
        responseCompanies.data,
        'id',
      )
      const unitNameArray = convertArrayToObject(responseUnits.data, 'id')

      const asset = {
        ...data,
        status: handleAssetStatus(data?.status),
        companyName: companyNameArray[data.companyId],
        unitName: unitNameArray[data.unitId],
        model: handleAssetModel(data?.model),
        inAlertNumber,
        inDowntimeNumber,
        inOperationNumber,
        unplannedStopNumber,
      }
      unstable_batchedUpdates(() => {
        setData(asset)
        setCompanies(responseCompanies?.data)
        setUnits(responseUnits?.data)
      })
    } catch {
      toast.error('Falha ao carregar dados do equipamento.')
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
        <Col
          style={{
            display: 'flex',
            flexDirection: md ? 'row' : 'column',
            width: '100%',
            alignItems: 'center',
            marginTop: '40px',
            justifyContent: 'center',
          }}
        >
          <Image
            src={data?.image}
            preview={false}
            style={{
              borderRadius: '40%',
              padding: '12px',
              boxShadow: '1px 1px 30px 5px #001529',
              background: '#001529',
              maxHeight: '300px',
            }}
            alt="Home Logo"
          />

          <Col
            style={{
              padding: '12px',
              textAlign: 'start',
            }}
          >
            <Typography style={{ justifyContent: 'flex-start' }}>
              Nome: <Typography>{data?.name}</Typography>
            </Typography>
            <Divider />
            <Typography style={{ justifyContent: 'flex-start' }}>
              Empresa: <Typography>{data?.companyName}</Typography>
            </Typography>
            <Divider />
            <Typography style={{ justifyContent: 'flex-start' }}>
              Unidade: <Typography>{data?.unitName}</Typography>
            </Typography>
            <Divider />
            <Typography style={{ justifyContent: 'flex-start' }}>
              Modelo: <Typography>{data?.model}</Typography>
            </Typography>
            <Divider />
            <Typography style={{ justifyContent: 'flex-start' }}>
              Status: <Typography>{data?.status}</Typography>
            </Typography>
          </Col>
        </Col>
        <Row justify="center" align="middle" style={{ marginTop: '24px' }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={getOptions(
              'pie',
              data as FormattedAssetsDataType,
              md as boolean,
            )}
          />
        </Row>
      </Col>
      <EditAssetModal
        setIsModalOpen={setIsEditModalOpen}
        isModalOpen={isEditModalOpen}
        id={String(id)}
        companies={companies as Array<CompanyDataType>}
        units={units as Array<UnitDataType>}
        userData={data as FormattedAssetsDataType}
      />
      <DeleteModal
        setIsModalOpen={setIsDeleteModalOpen}
        isModalOpen={isDeleteModalOpen}
        modalTitle="equipamento"
        url={`/assets/${id}`}
      />
    </>
  )
}

export default AssetInternal
