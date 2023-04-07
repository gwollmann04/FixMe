import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { WorkOrders } from '@/src/components'

const WorkOrdersPage: FC = (props) => {
  return <WorkOrders {...props} />
}

export default WorkOrdersPage

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}
