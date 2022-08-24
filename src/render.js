function renderHourBlock(hourBlocks, hourBlock, dayName){
    const dayNameUpperCase = dayName.toUpperCase() 
    const idSelector = `${dayNameUpperCase}_${hourBlock}`
    document.getElementById(idSelector).innerHTML = hourBlocks[hourBlock].name ? hourBlocks[hourBlock].name : "";
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
export { renderWeekBlock, renderDayBlock }