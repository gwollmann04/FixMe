export declare type WorkOrderDataType = {
  assetId: number
  assignedUserIds: Array<number>
  checklist: Array<CheckListType>
  description: string
  id: number
  priority: string
  status: string
  title: string
}

export declare type FormattedWorkOrderDataType = {
    assetId: number
    assignedUserIds: Array<number>
    checklist: Array<CheckListType>
    description: string
    id: number
    priority: string
    status: string
    title: string
    assetName: string
    numberOfUsers: number
  }

export declare type CheckListType = {
  completed: boolean | string
  task: string
}

export declare type editWorkOrderDataType = {
    description: string
    priority: string
    status: string
  }

  export declare type createWorkOrderDataType = {
    description: string
    title: string
    priority: string
    usersNumber: number
    assetId: number
  }
