import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { UserInternal } from '@/src/components'

const UserPageInteral: FC = (props) => {
  return <UserInternal {...props} />
}

export default UserPageInteral

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { id: query.id },
  }
}
