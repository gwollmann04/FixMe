export const convertArrayToObject = (array: any[], key: string) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item.name,
    }
  }, initialValue)
}

export const handleStatus = (status: string) => {
  if (status === 'completed') return 'Concluído'
  if (status === 'in progress') return 'Em Progresso'
}

export const handlePriority = (priority: string) => {
  if (priority === 'high') return 'Alta'
}

export const handleCheckListStatus = (status: boolean) =>
  status ? 'Concluído' : 'Em progresso'
