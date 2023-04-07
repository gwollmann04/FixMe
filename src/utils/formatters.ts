export const convertCompanyArrayToObject = (array: any, key: string) => {
    const initialValue = {}
    return array.reduce((obj: any, item: { [x: string]: any; name: string }) => {
      return {
        [item[key]]: item.name,
      }
    }, initialValue)
  }
  