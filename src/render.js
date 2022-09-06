import { allTasks } from "./task.js"; 

function renderHourBlock(hourBlocks, hourBlock, dayName){
    const listHourBlocks = Object.keys(hourBlocks)
    const hourBlockIndex = listHourBlocks.indexOf(hourBlock)
    let nextHourBlockIndex = hourBlockIndex + 1
    let nextHourBlock = listHourBlocks[nextHourBlockIndex]

    const dayNameUpperCase = dayName.toUpperCase() 
    const idSelector = `${dayNameUpperCase}_${hourBlock}`

    let nextIdSelector = `${dayNameUpperCase}_${nextHourBlock}`

    const currentHourBlockCell = document.getElementById(idSelector)
    let nextHourBlockCell = document.getElementById(nextIdSelector)

    currentHourBlockCell.innerHTML = hourBlocks[hourBlock].name ? hourBlocks[hourBlock].name : "";
    if (hourBlockIndex === listHourBlocks.length - 1) {
        return
    }
    if (hourBlocks[hourBlock]?.name === undefined) {
        return
    }
    if (nextHourBlockCell.style.display === "none") {
        return
    }
    let counterRep = 1;
    while (hourBlocks[hourBlock]?.name === hourBlocks[nextHourBlock]?.name) {
        nextHourBlockCell.style.display = 'none'

        nextHourBlockIndex += 1
        nextHourBlock = listHourBlocks[nextHourBlockIndex]
        nextIdSelector = `${dayNameUpperCase}_${nextHourBlock}`
        nextHourBlockCell = document.getElementById(nextIdSelector)
        counterRep += 1
    }
    currentHourBlockCell.setAttribute('rowspan', counterRep)
    currentHourBlockCell.style.backgroundColor = hourBlocks[hourBlock].color
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

function restoreHourBlock(hourBlock, dayName) {
    const dayNameUpperCase = dayName.toUpperCase() 
    const idSelector = `${dayNameUpperCase}_${hourBlock}`
    const currentHourBlockCell = document.getElementById(idSelector)
    currentHourBlockCell.style.all = ''
}

export { renderWeekBlock, renderDayBlock, renderAllTask }