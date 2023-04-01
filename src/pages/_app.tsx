import 'react-toastify/dist/ReactToastify.css';
import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider  theme={{
      token: {
          fontFamily: 'Roboto',
      }
  }}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
