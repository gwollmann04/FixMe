import { useCallback, useEffect, useState } from 'react'
import { Typography, Row, Col, Grid, Divider, Switch, Image, Spin } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { api } from '@/src/providers/api'
import { CompanyDataType } from '@/src/@types/companies'
import { unstable_batchedUpdates } from 'react-dom'

const { useBreakpoint } = Grid

const mockedData = [
  {
    id: 0,
    name: 'The Test Company I',
  },
  {
    id: 1,
    name: 'The Test Company II',
  },
  {
    id: 2,
    name: 'The Test Company III',
  },
  {
    id: 3,
    name: 'The Test Company IV',
  },
  {
    id: 4,
    name: 'The Test Company V',
  },
  {
    id: 5,
    name: 'The Test Company VI',
  },
  {
    id: 6,
    name: 'The Test Company VII',
  },
]
const Companies = () => {
  const [data, setData] = useState<CompanyDataType>()
  const [Apidata, setApiData] = useState<CompanyDataType>()
  const [isLoading, setIsLoading] = useState(false)

  const { xl, lg } = useBreakpoint()
  const router = useRouter()

  const handleSelectedData = useCallback(() => {
    if (JSON.stringify(data) === JSON.stringify(Apidata)) {
      setData(mockedData)
      return toast.success('Utilizando dados mockados.')
    }

    setData(Apidata)
  }, [Apidata, data])

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
        }}
        defaultChecked
        onChange={handleSelectedData}
      />
      <Col style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography
          color="#f9f9f9"
          style={{
            fontSize: lg ? '3vw' : '5vw',
            padding: '10px 0px',
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
                alt="Home Logo"
              />
              <Divider style={{ margin: '0px' }} />
              <Typography
                style={{
                  fontSize: xl ? '1.5vw' : lg ? '2vw ' : '3.5vw',
                  padding: '10px 0px',
                }}
              >
                {item.name}
              </Typography>
            </Col>
          ))}
        </Row>
        <ToastContainer />
      </Col>
    </>
  )
}

export default Companies
