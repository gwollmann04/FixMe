import { FC } from 'react'
import { GetServerSideProps } from 'next'

import { AssetInternal } from '@/src/components'

const AssetInternalPage: FC = (props) => {
  return <AssetInternal {...props} />
}

export default AssetInternalPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { id: query.id },
  }
}
