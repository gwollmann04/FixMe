export declare type AssetsDataType = {
  assignedUserIds: Array<number>
  companyId: number
  healthHistory: Array<healthHistoryDataType>
  healthscore: number
  id: number
  image: string
  metrics: Object<MetricsDataType>
  model: string
  name: string
  sensors: Array<string>
  specifications: {
    mmaxTemp: number
  }
  status: string
  unitId: number
}

export declare type healthHistoryDataType = {
  status: string
  timestamp: string
}

export declare type MetricsDataType = {
  lastUptimeAt: string
  totalCollectsUptime: number
  totalUptime: number
}
