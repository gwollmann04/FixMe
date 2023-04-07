import { useCallback, useEffect, useState } from 'react'
import { Typography, Row, Col, Grid, Divider, Switch, Image, Spin } from 'antd'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { PlusCircleFilled } from '@ant-design/icons'

import { api } from '@/src/providers/api'
import { UnitDataType, UnitDataFormattedType } from '@/src/@types/units'
import { unstable_batchedUpdates } from 'react-dom'
import { mockedUnitsData } from '@/src/utils/constants'
import { AddUnitModal } from '@/src/components'
import { convertArrayToObject } from '@/src/utils/formatters'
import { CompanyDataType } from '@/src/@types/companies'

const { useBreakpoint } = Grid

const Units = () => {
  const [data, setData] = useState<Array<UnitDataFormattedType>>()
  const [apiData, setApiData] = useState<Array<UnitDataFormattedType>>()
  const [companies, setCompanies] = useState<Array<CompanyDataType>>()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { xl, lg } = useBreakpoint()
  const router = useRouter()

  const handleSelectedData = useCallback(() => {
    if (JSON.stringify(data) === JSON.stringify(apiData)) {
      setData(mockedUnitsData)
      return toast.success('Utilizando dados mockados.')
    }

    setData(apiData)
  }, [apiData, data])

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/units')
      const response = await api.get('/companies')

      const companyNameArray = convertArrayToObject(response.data, 'id')

      const formattedUnits = data.map((unit: UnitDataType) => ({
        ...unit,
        companyName: companyNameArray[unit.companyId],
      }))

      unstable_batchedUpdates(() => {
        setCompanies(response?.data)
        setApiData(formattedUnits)
        setData(formattedUnits)
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
      <Switch
        style={{
          position: 'absolute',
          right: '20px',
          top: '85px',
          zIndex: '1',
          background: '#001529',
        }}
        defaultChecked
        onChange={handleSelectedData}
      />
      <Typography
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'absolute',
          right: '80px',
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
        Nova unidade <PlusCircleFilled style={{ marginLeft: '6px' }} />
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
          Unidades associadas
        </Typography>
        <Row justify="center" style={{ marginTop: '10px' }}>
          {data?.map((item) => (
            <Col
              key={item.id}
              style={{
                margin: lg ? '25px' : '15px',
                borderRadius: '12px',
                boxShadow: '1px 1px 8px 1px #000000',
                display: 'flex',
                padding: '12px',
                flexDirection: 'column',
                maxHeight: '300px',
                cursor: 'pointer',
                alignItems: 'center',
              }}
              onClick={() => router.push(`/units/${item.id}`)}
              span={xl ? 6 : lg ? 12 : 18}
            >
              <Image
                src="/company.jpg"
                preview={false}
                width="75%"
                height="75%"
                style={{
                  borderRadius: '5px',
                }}
                alt="Unit Logo"
              />
              <Divider style={{ margin: '0px' }} />
              <Typography
                style={{
                  fontSize: '24px',
                  padding: '10px 0px 0px 0px',
                }}
              >
                {item.name}
              </Typography>
              <Typography
                style={{
                  fontSize: '18px',
                  padding: '0px',
                }}
              >
                Empresa: {item.companyName}
              </Typography>
            </Col>
          ))}
        </Row>
      </Col>
      <AddUnitModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        companies={companies as Array<CompanyDataType>}
      />
    </>
  )
}

export default Units
