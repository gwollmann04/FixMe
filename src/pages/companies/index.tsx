import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { Companies } from '@/src/components'

const CompaniesPage: FC = (props) => {
  return <Companies {...props} />
}

export default CompaniesPage

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}
