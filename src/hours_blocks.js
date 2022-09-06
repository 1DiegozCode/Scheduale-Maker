import {exactToExact, halfToHalf, exactToHalf, halfToExact} from "./hour_functions.js"

function createHourArray(startingTime, endingTime) {
    const startingTimeArray = startingTime.split(":")
    const endingTimeArray = endingTime.split(":")
    let hoursArray = [];

    const startingHour = parseInt(startingTimeArray[0])
    const endingHour = parseInt(endingTimeArray[0])

    let startingMinute = parseInt(startingTimeArray[1]) 
    let endingMinute = parseInt(endingTimeArray[1])

    let sameMinute = startingMinute === endingMinute ? true : false
    let situation = "unknown"

    if(sameMinute){
        situation = startingMinute === 0 ? "exactToExact" : "halfToHalf"
    } else {
        situation = startingMinute === 0 ? "exactToHalf" : "halfToExact"
    }
    const functionToUse = {
        exactToExact: exactToExact(startingHour, endingHour),
        halfToHalf: halfToHalf(startingHour, endingHour),
        exactToHalf: exactToHalf(startingHour, endingHour),
        halfToExact: halfToExact(startingHour, endingHour)
    }
    hoursArray = functionToUse[situation]
    return hoursArray 
}


class HoursBlocks {
    constructor(startingTime, endingTime) {
        let HoursBlocksArray = createHourArray(startingTime, endingTime);
        HoursBlocksArray.map(block => this[block] = "");
    }

    get blockTasks() {
        return [... new Set (Object.keys(this).map(key => this[key]? this[key] : "").filter(task => task))];
    }

    addTask(task, startingTime, endingTime) {
        const duration = createHourArray(startingTime, endingTime);
        let resultMessage = "";
        if (duration.every(block => this[block] === "")) {
            duration.map(block => this[block] = task);
            resultMessage = "Task has been add correctly";
        } else {
            resultMessage = "Error: The starting hour or the ending hour not match with the hours block || An existing task is already schedule";
        }
        return resultMessage;
    }

    clearHourBlocks(startingTime, endingTime) {
        const duration = createHourArray(startingTime, endingTime);
        duration.map(block => this[block] = "")
    }
}

export { HoursBlocks , createHourArray};