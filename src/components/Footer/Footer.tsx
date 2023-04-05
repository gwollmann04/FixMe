import {  toast } from 'react-toastify'
import { Typography } from 'antd'
import { MailOutlined, WhatsAppOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Footer = () => {
  const notify = (event: any) => {
    navigator.clipboard.writeText(event.target.text)
    event.preventDefault()
    toast.success('Copiado para a Área de transferência!')
  }
  return (
    <Typography
      style={{
        background: '#001529',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px',
      }}
    >
      <Typography style={{ fontSize: '24px', marginBottom: '18px' }}>
        Canais de atendimento:
      </Typography>

      <Typography style={{ fontSize: '16px' }}>
        <MailOutlined style={{ marginRight: '4px' }} />
        E-mail:
        <Link
          onClick={(event) => notify(event)}
          href="atendimento@fixme.com.br"
        >
          {' '}
          atendimento@fixme.com.br
        </Link>
      </Typography>

      <Typography style={{ fontSize: '16px', margin: '6px 0' }}>
        <WhatsAppOutlined style={{ marginRight: '4px' }} />
        WhatsApp:
        <Link onClick={(event) => notify(event)} href="(75) 9 8445-1539">
          {' '}
          (75) 9 8445-1539
        </Link>
      </Typography>

      <Typography style={{ fontSize: '16px' }}>
        © 2023 Copyright:
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/gwollmann04"
        >
          {' '}
          github.com/gwollmann04
        </Link>
      </Typography>
    </Typography>
  )
}

export default Footer
