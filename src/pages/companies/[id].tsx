import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { Companies } from '@/src/components'

const CompaniesPage: FC = (props) => {
    console.log(props)
  return <Companies {...props} />
}

export default CompaniesPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { id: query.id },
  }
}
