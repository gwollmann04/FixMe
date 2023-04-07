import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { AssetsComponent } from '@/src/components'

const AssetsPage: FC = (props) => {
  return <AssetsComponent {...props} />
}

export default AssetsPage

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}
