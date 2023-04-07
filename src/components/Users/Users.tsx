import { useCallback, useEffect, useState } from 'react'
import { Typography, Row, Col, Spin, Card } from 'antd'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { PlusCircleFilled } from '@ant-design/icons'

import { api } from '@/src/providers/api'
import { UserDataType, UserDataFormattedType } from '@/src/@types/users'
import { AddUserModal } from '@/src/components'
import { convertArrayToObject } from '@/src/utils/formatters'
import { unstable_batchedUpdates } from 'react-dom'
import { CompanyDataType } from '@/src/@types/companies'
import { UnitDataType } from '@/src/@types/units'

const Units = () => {
  const [data, setData] = useState<Array<UserDataFormattedType>>()
  const [isLoading, setIsLoading] = useState(false)
  const [companies, setCompanies] = useState<Array<CompanyDataType>>()
  const [units, setUnits] = useState<Array<UnitDataType>>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/users')
      const responseCompanies = await api.get('/companies')
      const responseUnits = await api.get('/units')

      const companyNameArray = convertArrayToObject(
        responseCompanies.data,
        'id',
      )
      const unitNameArray = convertArrayToObject(responseUnits.data, 'id')

      const formattedUnits = data.map((unit: UserDataType) => ({
        ...unit,
        companyName: companyNameArray[unit.companyId],
        unitName: unitNameArray[unit.unitId],
      }))

      unstable_batchedUpdates(() => {
        setData(formattedUnits)
        setCompanies(responseCompanies?.data)
        setUnits(responseUnits?.data)
      })
    } catch {
      toast.error('Falha ao carregar as unidades.')
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
        Nova usuário <PlusCircleFilled style={{ marginLeft: '6px' }} />
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
          Usuários
        </Typography>
        <Row justify="center">
          {data?.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              bordered={false}
              size="small"
              onClick={() => router.push(`/users/${item.id}`)}
              style={{
                maxWidth: '300px',
                width: '100%',
                margin: '26px',
                background: '#cdcdcd',
                boxShadow: '1px 1px 8px 1px #000000',
                color: '#001529',
                padding: '6px',
                cursor: 'pointer',
              }}
            >
              <Typography style={{ color: '#001529', fontSize: '16px' }}>
                Email: {item?.email}
              </Typography>
              <Typography style={{ color: '#001529', fontSize: '16px' }}>
                Empresa: {item?.companyName}
              </Typography>
              <Typography style={{ color: '#001529', fontSize: '16px' }}>
                Unidade: {item?.unitName}
              </Typography>
            </Card>
          ))}
        </Row>
      </Col>
      <AddUserModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        companies={companies as Array<CompanyDataType>}
        units={units as Array<UnitDataType>}
      />
    </>
  )
}

export default Units
