import { userWeek } from "../index.js"
import { notifyTask } from "./notifications.js"
import { Task, allTasks} from "./task.js"; 
import { renderWeekBlock, renderAllTask } from "./render.js";
import { restoreBlocks } from "./restore.js"

function addTask() {
    const newTaskForm = document.forms['NewTaskForm']
    const taskName = document.getElementById("TaskName").value;
    const taskType = document.getElementById("TaskType").value;
    const taskColor = document.getElementById("TaskColor").value;
    const taskTime = document.getElementById("TaskTime").value;
    const taskInitTime = taskTime.split("-")[0];
    const taskEndTime = taskTime.split("-")[1];
    const taskDay = document.getElementById("TaskDay").value;
    const userTask = new Task(taskName, taskType, taskColor)

    userWeek.scheduleTask(taskDay, userTask, taskInitTime, taskEndTime)
    renderWeekBlock(userWeek)
    newTaskForm.reset();
    saveTasks() 
    renderAllTask();
    notifyTask(taskName, taskDay, taskInitTime, taskEndTime)
}

function clearTasks() { // borrar bloques de tareas completos 
    const newTaskForm = document.forms['NewTaskForm']
    const taskTime = document.getElementById("TaskTime").value;
    const taskInitTime = taskTime.split("-")[0];
    const taskEndTime = taskTime.split("-")[1];
    const taskDay = document.getElementById("TaskDay").value.toLowerCase();
    userWeek[taskDay].clearTodayHoursBlock(taskInitTime, taskEndTime)
    restoreBlocks(taskInitTime, taskEndTime, taskDay)
    renderWeekBlock(userWeek)
    newTaskForm.reset();
}

function saveTasks() {
    const taskList = [...allTasks]
    const taskListJSON = JSON.stringify(taskList)
    localStorage.setItem('lastTaskList', taskListJSON);
}

function clearAllTask() { 
    allTasks.clear()
    saveTasks()
    renderAllTask()
}

export { addTask, clearTasks, clearAllTask}