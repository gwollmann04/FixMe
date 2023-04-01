import { ReactElement } from 'react'

interface IfComponentInterface {
  condition: any
  component: ReactElement
}

const IfComponent = ({ condition, component }: IfComponentInterface) => {
  if (condition) return component
  return null
}

export default IfComponent
