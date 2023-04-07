import { Image, Row, Typography, Col, Divider, Spin, Grid } from 'antd'
import { ParsedUrlQuery } from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { EditOutlined, CloseCircleFilled } from '@ant-design/icons'

import { UnitDataFormattedType } from '@/src/@types/units'
import { api } from '@/src/providers/api'
import { DeleteModal, EditUnitModal } from '@/src/components'
import { convertArrayToObject } from '@/src/utils/formatters'
import { CompanyDataType } from '@/src/@types/companies'
import { unstable_batchedUpdates } from 'react-dom'

const { useBreakpoint } = Grid

const UnitInternal = ({ id }: ParsedUrlQuery) => {
  const [data, setData] = useState<UnitDataFormattedType>()
  const [companies, setCompanies] = useState<Array<CompanyDataType>>()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { xs } = useBreakpoint()

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/units/${id}`)
      const response = await api.get('/companies')

      const companyNameArray = convertArrayToObject(response.data, 'id')

      const formattedUnits = {
        ...data,
        companyName: companyNameArray[data.companyId],
      }

      unstable_batchedUpdates(() => {
        setCompanies(response?.data)
        setData(formattedUnits)
      })
    } catch {
      toast.error('Falha ao carregar dados da unidade.')
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

      <Row justify="center" align="middle">
        <Image
          src="/company.jpg"
          preview={false}
          style={{
            borderRadius: '40%',
            padding: '12px',
            boxShadow: '1px 1px 30px 5px #001529',
            background: '#001529',
          }}
          alt="Home Logo"
        />
        <Col
          style={{
            padding: '12px',
            textAlign: 'start',
            marginLeft: xs ? '0px' : '26px',
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
            Criada em: <Typography>2012</Typography>
          </Typography>
          <Divider />
          <Typography style={{ justifyContent: 'flex-start' }}>
            Fundador: <Typography>John Doe</Typography>
          </Typography>
        </Col>
      </Row>
      <EditUnitModal
        setIsModalOpen={setIsEditModalOpen}
        isModalOpen={isEditModalOpen}
        id={String(id)}
        unitData={data as UnitDataFormattedType}
        companies={companies as Array<CompanyDataType>}
      />
      <DeleteModal
        setIsModalOpen={setIsDeleteModalOpen}
        isModalOpen={isDeleteModalOpen}
        modalTitle="unidade"
        url={`/units/${id}`}
      />
    </>
  )
}

export default UnitInternal
