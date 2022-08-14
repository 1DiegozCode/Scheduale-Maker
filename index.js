import { HoursBlocks } from "./src/hours_blocks.js";
import { Day } from "./src/day.js";
import { Week } from "./src/week.js"; 
import { Task, taskTypesAdd, getTypeTask, allTasks, deleteTaskFromAllTasks} from "./src/task.js"; 


let newTaskForm = document.forms['NewTaskForm']
let tasksList = document.getElementById('TasksList')

function addTask() {
    let taskName = document.getElementById("TaskName").value;
    let taskType = document.getElementById("TaskType").value;
    let taskColor = document.getElementById("TaskColor").value;
    new Task(taskName, taskType, taskColor)
    newTaskForm.reset();
}

function deleteTask() {
    let taskName = document.getElementById("TaskName").value;
    let taskType = document.getElementById("TaskType").value;
    let taskColor = document.getElementById("TaskColor").value;
    let newTask = new Task(taskName, taskType, taskColor)
    deleteTaskFromAllTasks(newTask)
    newTaskForm.reset();
}

function showTasks() {
    tasksList.innerHTML = ""
    for (const task of allTasks) {
        const taskLi = document.createElement("li");
        taskLi.innerHTML = task
        tasksList.appendChild(taskLi);
    }
}
document.getElementById("AddTask").addEventListener("click", addTask)
document.getElementById("DeleteTask").addEventListener("click", deleteTask)
document.getElementById("ShowTasks").addEventListener("click", showTasks)
console.log(allTasks)