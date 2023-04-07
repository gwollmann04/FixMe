import { Image, Row, Typography, Col, Divider, Spin, Grid } from 'antd'
import { ParsedUrlQuery } from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { EditOutlined, CloseCircleFilled } from '@ant-design/icons'

import { UserDataFormattedType } from '@/src/@types/users'
import { api } from '@/src/providers/api'
import { DeleteModal, EditUserModal } from '@/src/components'
import { convertArrayToObject } from '@/src/utils/formatters'
import { CompanyDataType } from '@/src/@types/companies'
import { UnitDataType } from '@/src/@types/units'
import { unstable_batchedUpdates } from 'react-dom'

const { useBreakpoint } = Grid

const UserInternal = ({ id }: ParsedUrlQuery) => {
  const [data, setData] = useState<UserDataFormattedType>()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [companies, setCompanies] = useState<Array<CompanyDataType>>()
  const [units, setUnits] = useState<Array<UnitDataType>>()

  const { xs } = useBreakpoint()

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/users/${id}`)
      const responseCompanies = await api.get('/companies')
      const responseUnits = await api.get('/units')

      const companyNameArray = convertArrayToObject(
        responseCompanies.data,
        'id',
      )
      const unitNameArray = convertArrayToObject(responseUnits.data, 'id')

      const formattedUnits = {
        ...data,
        companyName: companyNameArray[data.companyId],
        unitName: unitNameArray[data.unitId],
      }

      unstable_batchedUpdates(() => {
        setData(formattedUnits)
        setCompanies(responseCompanies?.data)
        setUnits(responseUnits?.data)
      })
    } catch {
      toast.error('Falha ao carregar dados do usuário.')
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
          src="https://github.com/gwollmann04.png"
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
            Email: <Typography>{data?.email}</Typography>
          </Typography>
          <Divider />
          <Typography style={{ justifyContent: 'flex-start' }}>
            Empresa: <Typography>{data?.companyName}</Typography>
          </Typography>
          <Divider />
          <Typography style={{ justifyContent: 'flex-start' }}>
            Unidade: <Typography>{data?.unitName}</Typography>
          </Typography>
        </Col>
      </Row>
      <EditUserModal
        setIsModalOpen={setIsEditModalOpen}
        isModalOpen={isEditModalOpen}
        id={String(id)}
        userData={data as UserDataFormattedType}
        companies={companies as Array<CompanyDataType>}
        units={units as Array<UnitDataType>}
      />
      <DeleteModal
        setIsModalOpen={setIsDeleteModalOpen}
        isModalOpen={isDeleteModalOpen}
        modalTitle="usuário"
        url={`/users/${id}`}
      />
    </>
  )
}

export default UserInternal
