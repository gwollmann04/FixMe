import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { Users } from '@/src/components'

const UsersPage: FC = (props) => {
  return <Users {...props} />
}

export default UsersPage

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}
