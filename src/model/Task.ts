export type TaskType = {
  _id: string
  name: string
}

export default class Task {
  _id: string
  name: string

  constructor(task: TaskType) {
    this._id = task._id
    this.name = task.name
  }
}
