import { Image, Row, Typography, Col } from 'antd'

const HomeComponent = () => {
  return (
    <Row
      style={{
        display: 'flex',
        width: '100%',
      }}
      justify="space-around"
      align="middle"
    >
      <Image
        className="fade-in-image"
        width={400}
        src="/home_logo.png"
        preview={false}
        alt="Home Logo"
      />
      <Col style={{ marginRight: '20%' }}>
        <Typography>Teste </Typography>
        <Typography>Teste </Typography>
        <Typography>Teste </Typography>
        <Typography>Teste </Typography>
      </Col>
    </Row>
  )
}

export default HomeComponent
