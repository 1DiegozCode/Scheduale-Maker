import {exactToExact, halfToHalf, exactToHalf, halfToExact} from "./hour_functions.js"



function splitHourMinute(hourMinute) {
    return hourMinute.split(':')
}

function getStartingEndTimeData(startingTime, endingTime) {
    const startingTimeArray = splitHourMinute(startingTime)
    const endingTimeArray = splitHourMinute(endingTime)
    const startingHour = parseInt(startingTimeArray[0])
    const endingHour = parseInt(endingTimeArray[0])
    const startingMinute = parseInt(startingTimeArray[1]) 
    const endingMinute = parseInt(endingTimeArray[1])
    return {
        startingHour: startingHour,
        endingHour: endingHour,
        startingMinute: startingMinute,
        endingMinute: endingMinute
    }
}

function checkStartingEndTime(startingTime, endingTime) {
    const {startingHour, endingHour, startingMinute, endingMinute} = getStartingEndTimeData(startingTime, endingTime)
    if (startingTime === endingTime) {
        return false
    }
    if (startingHour > endingHour) {
        return false
    }
    if (startingHour === endingHour && startingMinute > endingMinute) {
        return false
    }
    return true;
}

function createHourArray(startingTime, endingTime) {
    const {startingHour, endingHour, startingMinute, endingMinute} = getStartingEndTimeData(startingTime, endingTime)
    const sameMinute = startingMinute === endingMinute ? true : false
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
    const hoursArray = functionToUse[situation]
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
        if (!checkStartingEndTime(startingTime, endingTime)) {
            return console.error('Check if the hour range is correct')
        }
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