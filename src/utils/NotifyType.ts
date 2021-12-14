class NotifyType {
  type: 'INFO' | 'SUCCESS' | 'ERROR'

  static INFO: string

  static SUCCESS: string

  static ERROR: string

  constructor(type: any) {
    this.type = type
  }

  getType() {
    return this.type
  }
}

NotifyType.INFO = 'INFO'
NotifyType.SUCCESS = 'SUCCESS'
NotifyType.ERROR = 'ERROR'

Object.freeze(NotifyType) // 冻结对象，防止修改

export default NotifyType
