class TaskDate {
    constructor(task, date) {
        this._task = task
        this._date = date
    }

    get task() {
        return this._task
    }

    get date() {
        return this._date
    }
}

export { TaskDate }