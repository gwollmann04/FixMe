import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { Units } from '@/src/components'

const UnitsPage: FC = (props) => {
  return <Units {...props} />
}

export default UnitsPage

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}
