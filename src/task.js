const taskTypes = {
    work: "work",
    study: "study",
    home: "home"
}
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

class Task {
    constructor(taskName, taskType, taskColour) {
        this._taskName = taskName;
        this._taskTyper = taskTypes[taskType];
        this._taskColour = taskColours[taskColour];
        taskTypesAdd[taskType].add(this);
    }
}

export {Task, taskTypesAdd};