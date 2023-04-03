import { Image, Row, Typography, Col, Divider } from 'antd'

const HomeComponent = () => {
  return (
    <Row
      style={{
        display: 'flex',
        width: '100%',
        background: '#cdcdcd',
      }}
      justify="space-around"
      align="middle"
      className="fade-in-animation"
    >
      <Image
        src="/home_logo.png"
        preview={false}
        style={{
          borderRadius: '40%',
          padding: '12px',
          boxShadow: '1px 1px 30px 5px #001529',
          background: '#001529',
        }}
        alt="Home Logo"
      />
      <Col style={{ padding: '12px' }}>
        <Typography>Há mais de 30 anos no mercado </Typography>
        <Divider />
        <Typography>Referência no monitoramento de equipamentos </Typography>
        <Divider />
        <Typography>Ambiente centralizado com todas informações </Typography>
        <Divider />
        <Typography>
          Viabilizando dinamismo para realização dos reparos{' '}
        </Typography>
      </Col>
    </Row>
  )
}

export default HomeComponent
