import { createHourArray } from "./hours_blocks.js"

function restoreHourBlock(hourBlock, dayName) {
    const dayNameUpperCase = dayName.toUpperCase() 
    const idSelector = `${dayNameUpperCase}_${hourBlock}`
    const currentHourBlockCell = document.getElementById(idSelector)
    currentHourBlockCell.innerHTML = ''
    currentHourBlockCell.style.cssText = ''
    currentHourBlockCell.setAttribute('rowspan', '1')
    currentHourBlockCell.style.display = 'table-cell'
}

function restoreBlocks(startingTime, endingTime, dayName) {
    const blocks = createHourArray(startingTime, endingTime)
    blocks.forEach(block => restoreHourBlock(block, dayName));
}

function restoreDayBlock(day) {
    const dayHourBlocks = day.hourBlocks
    const dayName = day.dayName
    for (const hourBlock in dayHourBlocks) {
        restoreHourBlock(dayHourBlocks, hourBlock, dayName)
    }
}

function restoreWeekBlock(week) {
    for (const day in week) {
        restoreDayBlock(week[day])
    }
}

export { restoreBlocks }
