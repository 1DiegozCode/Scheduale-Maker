import { userWeek } from "../index.js"
import { notifyTask } from "./notifications.js"
import { Task, allTasks} from "./task.js"; 
import { renderWeekBlock, renderAllTask, restoreTdAddTaskModal } from "./render.js";
import { restoreBlocks } from "./restore.js"
import { TaskDate } from "./task_date.js"
import { Date, getInitEndTimeArray } from "./date.js"


let taskDateSelectedForDelete = ''// Store a selected taskDate instance to get the info to delete it
let hourBlockCellSelectedForRestore = ''//Store a selected BlockCell to get the info to delete it

function getTaskFormInfo() {
    const taskName = document.getElementById("TaskName").value;
    const taskType = document.getElementById("TaskType").value;
    const taskColor = document.getElementById("TaskColor").value;
    const taskTime = document.getElementById("TaskTime").value;
    const taskInitTime = getInitEndTimeArray(taskTime)[0];
    const taskEndTime = getInitEndTimeArray(taskTime)[1];
    const taskDay = document.getElementById("TaskDay").value;
    return {
        taskName: taskName,
        taskType: taskType,
        taskColor: taskColor,
        taskTime: taskTime,
        taskInitTime: taskInitTime,
        taskEndTime: taskEndTime,
        taskDay: taskDay
    }
}

function addTask() {
    const {taskName, taskType, taskColor, taskTime, taskInitTime, taskEndTime, taskDay} = getTaskFormInfo()
    const userTask = new Task(taskName, taskType, taskColor)
    const userDate = new Date(taskTime, taskDay)
    const userTaskDate = new TaskDate(userTask, userDate)
    const newTaskForm = document.forms['NewTaskForm']
    userWeek.scheduleTask(userTaskDate, taskDay,  taskInitTime, taskEndTime)
    renderWeekBlock(userWeek)
    newTaskForm.reset();
    saveTasks() 
    renderAllTask();
    notifyTask(taskName, taskDay, taskInitTime, taskEndTime)
}

function clearTasks() {
    const { date: {initTime, endTime, day}} = taskDateSelectedForDelete
    userWeek[day.toLowerCase()].clearTodayHoursBlock(initTime, endTime)
    restoreBlocks(initTime, endTime, day.toLowerCase())
    allTasks.delete(taskDateSelectedForDelete.task.taskInfo)
    renderWeekBlock(userWeek)
    renderAllTask()
    restoreTdAddTaskModal(hourBlockCellSelectedForRestore)
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

function updateFormDate(td) {
    const [day, time] = td.getAttribute("id").split("_")
    document.getElementById("TaskTime").value = time
    document.getElementById("TaskDay").value = day.charAt(0).toUpperCase() + day.toLowerCase().slice(1)
}

function updateModalInfo(hourBlockCell ,hourBlocks, hourBlock) {
    document.getElementById("InfoTaskModalTitle").innerHTML = `${hourBlocks[hourBlock]?.task?.name}`
    document.getElementById("InfoTaskModalType").innerHTML = `Type: ${hourBlocks[hourBlock]?.task?.type}`
    document.getElementById("InfoTaskModalDay").innerHTML = `${hourBlocks[hourBlock]?.date?.day}`
    document.getElementById("InfoTaskModalTime").innerHTML = `From ${hourBlocks[hourBlock]?.date?.initTime} to ${hourBlocks[hourBlock]?.date?.endTime}`
    taskDateSelectedForDelete = hourBlocks[hourBlock]
    hourBlockCellSelectedForRestore = hourBlockCell
}

export { addTask, clearTasks, clearAllTask, updateFormDate, updateModalInfo }