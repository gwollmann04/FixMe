import 'react-toastify/dist/ReactToastify.css'
import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider, Layout } from 'antd'

import { NavBar, Footer, Header } from '@/src/components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Roboto',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout>
          <NavBar />
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </Layout>
    </ConfigProvider>
  )
}
