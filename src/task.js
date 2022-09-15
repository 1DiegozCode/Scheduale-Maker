const taskTypesAdd = {
    work: new Set(),
    study: new Set(),
    home: new Set()
}

const allTasks = new Set()

function getTypeTask(taskType) {
    return taskTypesAdd[taskType]
}

function deleteTaskFromAllTasks(task) { // función provisional
    if (allTasks.has(task.taskInfo)) {
        allTasks.delete(task.taskInfo)
    }
}

class Task {
    constructor(taskName, taskType, taskColour) {
        this._taskName = taskName;
        this._taskType = taskType;
        this._taskColour = taskColour;
        taskTypesAdd[taskType] ? taskTypesAdd[taskType].add(this) : taskTypesAdd[taskType] = new Set().add(this);
        allTasks.add(this.taskInfo)
    }

    get name(){
        return this._taskName;
    }

    get type() {
        return this._taskType
    }

    get color() {
        return this._taskColour
    }

    get taskInfo() {
        return `Task Name: ${this.name}; Task Type: ${this.type}`
    }
}

export {Task, taskTypesAdd, getTypeTask, allTasks, deleteTaskFromAllTasks};