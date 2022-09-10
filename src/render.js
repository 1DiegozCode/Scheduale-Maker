import { allTasks } from "./task.js"; 
import { updateModalInfo } from "./handlers.js"


function setShowTaskInfo(hourBlockCell, hourBlocks, hourBlock) {
    hourBlockCell.setAttribute("data-bs-target","#InfoTaskModal")
    hourBlockCell.addEventListener("click", () => updateModalInfo(hourBlockCell, hourBlocks, hourBlock))
}

function restoreTdAddTaskModal(hourBlockCell) {
    hourBlockCell.removeEventListener("click", () => updateModalInfo(hourBlockCell, hourBlocks, hourBlock))
    hourBlockCell.setAttribute("data-bs-toggle","modal")
    hourBlockCell.setAttribute("data-bs-target","#AddTaskModal")
}

function renderHourBlock(hourBlocks, hourBlock, dayName) { //se debe separar en varias funciones menores
    const listHourBlocks = Object.keys(hourBlocks)
    const hourBlockIndex = listHourBlocks.indexOf(hourBlock)
    let nextHourBlockIndex = hourBlockIndex + 1
    let nextHourBlock = listHourBlocks[nextHourBlockIndex]

    const dayNameUpperCase = dayName.toUpperCase() 
    const idSelector = `${dayNameUpperCase}_${hourBlock}`

    let nextIdSelector = `${dayNameUpperCase}_${nextHourBlock}`

    const currentHourBlockCell = document.getElementById(idSelector)
    let nextHourBlockCell = document.getElementById(nextIdSelector)
    currentHourBlockCell.innerHTML = hourBlocks[hourBlock]?.task?.name ? hourBlocks[hourBlock]?.task?.name : "";
    if (hourBlockIndex === listHourBlocks.length - 1) {
        return
    }
    if (hourBlocks[hourBlock]?.task?.name === undefined) {
        return
    }
    if (nextHourBlockCell.style.display === "none") {
        return
    }
    if (currentHourBlockCell.style.display === "none") {
        return
    }
    let counterRep = 1;
    while (hourBlocks[hourBlock]?.task?.name === hourBlocks[nextHourBlock]?.task?.name) {
        nextHourBlockCell.style.display = 'none'

        nextHourBlockIndex += 1
        nextHourBlock = listHourBlocks[nextHourBlockIndex]
        nextIdSelector = `${dayNameUpperCase}_${nextHourBlock}`
        nextHourBlockCell = document.getElementById(nextIdSelector)
        counterRep += 1
    }
    currentHourBlockCell.setAttribute('rowspan', counterRep)
    currentHourBlockCell.style.backgroundColor = hourBlocks[hourBlock]?.task?.color
    setShowTaskInfo(currentHourBlockCell, hourBlocks, hourBlock)
}

function renderDayBlock(day) {
    const dayHourBlocks = day.hourBlocks
    const dayName = day.dayName
    for (const hourBlock in dayHourBlocks) {
        renderHourBlock(dayHourBlocks, hourBlock, dayName)
    }
}

function renderWeekBlock(week) {
    for (const day in week) {
        renderDayBlock(week[day])
    }
}

function renderAllTask() {
    const tasksListUl = document.getElementById("TaskList")
    tasksListUl.innerHTML = ""
    for (const task of allTasks) {
        const taskLi = document.createElement("li");
        taskLi.innerHTML = task;
        tasksListUl.appendChild(taskLi);
    }
}

export { renderWeekBlock, renderDayBlock, renderAllTask, restoreTdAddTaskModal }