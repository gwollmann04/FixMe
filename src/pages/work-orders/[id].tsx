import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { WorkOrderInternal } from '@/src/components'

const WorkOrderPageInternal: FC = (props) => {
  return <WorkOrderInternal {...props} />
}

export default WorkOrderPageInternal

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { id: query.id },
  }
}
