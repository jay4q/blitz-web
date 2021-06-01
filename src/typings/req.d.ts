type IResponse<Data = any> = {
  code: number | string
  message: string
  data?: Data
}

interface BaseModel {
  _id: string
  _createTime: number
  _updateTime: number
}