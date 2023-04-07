import React, { useState } from 'react'
import {
  PieChartOutlined,
  HomeOutlined,
  UserOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  ShopOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, Grid } from 'antd'
import { useRouter } from 'next/router'

const { Sider } = Layout
const { useBreakpoint } = Grid

type MenuItem = Required<MenuProps>['items'][number]

const getMenuOption = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
): MenuItem => ({
  key,
  icon,
  label,
})

const items: MenuItem[] = [
  getMenuOption('Início', '/', <HomeOutlined style={{ fontSize: '20px' }} />),
  getMenuOption('Empresas', '/companies', <PieChartOutlined />),
  getMenuOption('Unidades', '/units', <ShopOutlined />),
  getMenuOption('Usuários', '/users', <UserOutlined />),
  getMenuOption('Equipamentos', '/equipments', <ToolOutlined />),
  getMenuOption('Ordens de Serviço', '/work-orders', <UnorderedListOutlined />),
]

const NavBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const { xs } = useBreakpoint()
  const router = useRouter()

  return (
    <Sider
      collapsible={!xs}
      collapsed={xs ? xs : collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ position: 'relative' }}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
        onClick={({ key }) => router.push(key)}
      />
    </Sider>
  )
}

export default NavBar
