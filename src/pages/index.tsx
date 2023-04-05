import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { HomeComponent } from '@/src/components'

const Home: FC = (props) => {
  return <HomeComponent {...props} />
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}
