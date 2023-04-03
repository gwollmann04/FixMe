import { useRouter } from 'next/router'
import { Typography, Grid } from 'antd'
import { ToolOutlined } from '@ant-design/icons'
import { IfComponent } from '../IfComponent'

const { useBreakpoint } = Grid
const { Title } = Typography

const Header = () => {
  const router = useRouter()
  const { xs } = useBreakpoint()

  const handleNavigation = () => {
    router.push('/')
  }

  return (
    <Typography
      style={{
        background:
          'linear-gradient(90deg, rgba(0,21,41,1) 0%, rgba(0,62,123,1) 83%, rgba(0,83,164,1) 100%)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '80px',
      }}
    >
      <Title style={{ color: '#cdcdcd' }} onClick={handleNavigation}>
        F
        <ToolOutlined
          style={{
            fontSize: '38px',
            color: '#cdcdcd',
            margin: '0 -8px 0 -6px',
          }}
          rotate={315}
        />
        x Me
      </Title>
      <IfComponent
        condition={!xs}
        component={
          <Title style={{ color: '#cdcdcd', margin: '0px' }} level={3}>
            Monitoramento e conserto de equipamentos
          </Title>
        }
      />
    </Typography>
  )
}

export default Header
