import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { UnitInternal } from '@/src/components'

const UnitPageInteral: FC = (props) => {
  return <UnitInternal {...props} />
}

export default UnitPageInteral

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { id: query.id },
  }
}
