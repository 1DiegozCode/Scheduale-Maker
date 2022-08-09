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

function getTypeTask(taskType) {
    return taskTypesAdd[taskType]
}

class Task {
    constructor(taskName, taskType, taskColour) {
        this._taskName = taskName;
        this._taskType = taskType;
        this._taskColour = taskColours[taskColour];
        taskTypesAdd[taskType] ? taskTypesAdd[taskType].add(this) : taskTypesAdd[taskType] = new Set().add(this);
    }
}

export {Task, taskTypesAdd, getTypeTask};