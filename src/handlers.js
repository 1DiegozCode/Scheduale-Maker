import { userWeek } from "../index.js"
import { notifyTask, notifyTaskError } from "./notifications.js"
import { Task, allTasks} from "./task.js"; 
import { renderWeekBlock, renderAllTask, restoreTdAddTaskModal, hideCreationForm, hideMainTitle } from "./render.js";
import { restoreBlocks } from "./restore.js"
import { TaskDate } from "./task_date.js"
import { Date, getInitEndTimeArray } from "./date.js"
import { createTableHeader, createTableRows, createTableCells } from "./create_table.js";
import { Week } from "./week.js";
import { loaderImit } from "./loader.js";
import { cleanTimeFormat } from "./clean_inputs.js";


let taskDateSelectedForDelete = ''// Store a selected taskDate instance to get the info to delete it
let hourBlockCellSelectedForRestore = ''//Store a selected BlockCell to get the info to delete it



function getUserTimeInfo() {
    const userCreationForm = document.getElementById('UserCreationForm');
    const userTimeValue = cleanTimeFormat(document.getElementById("UserTime").value);
    const userNameValue = document.getElementById("UserName").value;
    const userAddWeekendValue = document.getElementById("UserAddWeekend").checked;
    userCreationForm.reset()
    return {
        userTimeValue: userTimeValue, 
        userNameValue: userNameValue,
        userAddWeekendValue: userAddWeekendValue
    }
}

function addListenerToTD() {
    const scheduleTable = document.getElementById("UserTable")
    const allCellsArray = Array.prototype.slice.call(scheduleTable.getElementsByTagName("td"))
    const dateCellsArray = allCellsArray.filter(element => !(element.getAttribute("class") === "table-secondary") )
    dateCellsArray.forEach(td => td.setAttribute("data-bs-toggle","modal"))
    dateCellsArray.forEach(td => td.setAttribute("data-bs-target","#AddTaskModal"))
    dateCellsArray.forEach(td => td.addEventListener("click", () => updateFormDate(td)))
}

function handleCreateTable(resolve) {
    const {userTimeValue, userNameValue, userAddWeekendValue} = getUserTimeInfo();
    const [initUserTime, endUserTime] = getInitEndTimeArray(userTimeValue);
    const newUserWeek = new Week(initUserTime, endUserTime, userAddWeekendValue);
    createTableHeader(userAddWeekendValue);
    createTableRows(initUserTime, endUserTime);
    createTableCells(initUserTime, endUserTime, userAddWeekendValue);
    adjustSelectionDayOptions(userAddWeekendValue);
    addListenerToTD();
    document.getElementById('UserTableName').innerHTML = userNameValue;
    hideMainTitle();
    hideCreationForm();
    loaderImit();
    resolve(newUserWeek);
}

function adjustSelectionDayOptions(addWeekend) {
    if (!addWeekend) {
        const selectionTaskDay = document.getElementById('TaskDay');
        selectionTaskDay.remove(6);
        selectionTaskDay.remove(5);
    }
}

function getTaskFormInfo() {
    const taskName = document.getElementById("TaskName").value;
    const taskType = document.getElementById("TaskType").value;
    const taskColor = document.getElementById("TaskColor").value;
    const taskTime = cleanTimeFormat(document.getElementById("TaskTime").value);
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
    const {taskName, taskType, taskColor, taskTime, taskInitTime, taskEndTime, taskDay} = getTaskFormInfo();
    const userTask = new Task(taskName, taskType, taskColor);
    const userDate = new Date(taskTime, taskDay);
    const userTaskDate = new TaskDate(userTask, userDate);
    const newTaskForm = document.forms['NewTaskForm']
    const confirmation = userWeek.scheduleTask(userTaskDate, taskDay,  taskInitTime, taskEndTime);

    if(checkAddTaskConfirmation(confirmation)) {
        renderWeekBlock(userWeek);
        newTaskForm.reset();
        saveTasks();
        renderAllTask();
        notifyTask(taskName, taskDay, taskInitTime, taskEndTime);
    } else {
        notifyTaskError();
    }
}

function checkAddTaskConfirmation(confirmation) {
    return confirmation === 'Succeed';
}

function clearTasks() {
    const { date: {initTime, endTime, day}} = taskDateSelectedForDelete;
    userWeek[day.toLowerCase()].clearTodayHoursBlock(initTime, endTime);
    restoreBlocks(initTime, endTime, day.toLowerCase());
    allTasks.delete(taskDateSelectedForDelete.task.taskInfo);
    renderWeekBlock(userWeek);
    renderAllTask();
    restoreTdAddTaskModal(hourBlockCellSelectedForRestore);
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

export { addTask, clearTasks, clearAllTask, updateFormDate, updateModalInfo, getUserTimeInfo, handleCreateTable }