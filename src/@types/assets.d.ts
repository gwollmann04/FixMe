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

export declare type HealthHistoryDataType = {
  status: string
  timestamp: string
}

export declare type MetricsDataType = {
  lastUptimeAt: string
  totalCollectsUptime: number
  totalUptime: number
}

export declare type FormattedAssetsDataType = {
  assignedUserIds: Array<number>
  companyId: number
  healthHistory: Array<HealthHistoryDataType>
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
  unitName: string
  companyName: string
  inAlertNumber: number
  inDowntimeNumber: number
  inOperationNumber: number
  unplannedStopNumber: number
}

export declare type createAssetDataType = {
  name: string
  status: string
  model: string
  unitId: number
  companyId: number
  healthScore: number
}
