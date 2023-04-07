import { useCallback, useEffect, useState } from 'react'
import { Typography, Row, Col, Grid, Divider, Switch, Image, Spin } from 'antd'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { PlusCircleFilled } from '@ant-design/icons'

import { api } from '@/src/providers/api'
import { CompanyDataType } from '@/src/@types/companies'
import { unstable_batchedUpdates } from 'react-dom'
import { mockedCompaniesData } from '@/src/utils/constants'
import { AddCompanyModal } from '@/src/components'

const { useBreakpoint } = Grid

const Companies = () => {
  const [data, setData] = useState<Array<CompanyDataType>>()
  const [apiData, setApiData] = useState<Array<CompanyDataType>>()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { xl, lg } = useBreakpoint()
  const router = useRouter()

  const handleSelectedData = useCallback(() => {
    if (JSON.stringify(data) === JSON.stringify(apiData)) {
      setData(mockedCompaniesData)
      return toast.success('Utilizando dados mockados.')
    }

    setData(apiData)
  }, [apiData, data])

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/companies')

      unstable_batchedUpdates(() => {
        setApiData(data)
        setData(data)
      })
    } catch {
      toast.error('Falha ao carregar as empresas.')
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
        Nova empresa <PlusCircleFilled style={{ marginLeft: '6px' }} />
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
          Empresas parceiras
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
              onClick={() => router.push(`/companies/${item.id}`)}
              span={xl ? 6 : lg ? 12 : 18}
            >
              <Image
                src="/company.jpg"
                preview={false}
                width="75%"
                height="85%"
                style={{
                  borderRadius: '5px',
                }}
                alt="Company Logo"
              />
              <Divider style={{ margin: '0px' }} />
              <Typography
                style={{
                  fontSize: '24px',
                  padding: '10px 0px',
                }}
              >
                {item.name}
              </Typography>
            </Col>
          ))}
        </Row>
      </Col>
      <AddCompanyModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  )
}

export default Companies
