import { useCallback, useEffect } from 'react'
import { Typography } from 'antd'
import { ToastContainer, toast } from 'react-toastify'

import { api } from '@/src/providers/api'

const Companies = () => {
  const loadData = useCallback(async () => {
    try {
      const { data } = await api.get('/companies')
      console.log(data)
    } catch {
      toast.error('Copiado para a Área de transferência!')
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <>
      <Typography>teste</Typography>
      <ToastContainer />
    </>
  )
}

export default Companies
