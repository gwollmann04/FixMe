import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { CompanyInternal } from '@/src/components'

const CompanyPageInternal: FC = (props) => {
  return <CompanyInternal {...props} />
}

export default CompanyPageInternal

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { id: query.id },
  }
}
