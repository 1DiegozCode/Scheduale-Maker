const taskColours = {
    red: "red",
    blue: "blue",
    green: "green"
}

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

    get taskInfo() {
        const taskInfo = `Task Name: ${this._taskName}; Task Type: ${this._taskType}`
        return taskInfo
    }
}

export {Task, taskTypesAdd, getTypeTask, allTasks, deleteTaskFromAllTasks};