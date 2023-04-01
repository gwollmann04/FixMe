import React from 'react'

import { Layout } from 'antd'
import { NavBar, Footer, Header, HomeComponent } from '../components'

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <NavBar />
        <HomeComponent />
      </Layout>
      <Footer />
    </Layout>
  )
}

export default App
