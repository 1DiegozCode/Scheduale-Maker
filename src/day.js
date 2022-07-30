import {HoursBlocks} from './hours_blocks.js';


const daysNames = {
    MONDAY: "Monday",
    TUESDAY: "Tuesday",
    WEDNESDAY: "Wednesday",
    THURSDAY: "Thursday",
    FRIDAY: "Friday",
    SATURDAY: "Saturday",
    SUNDAY: "Sunday"
}

class Day {
    constructor(dayName, startingTime, endingTime) {
        this._dayName = daysNames[dayName];
        this._hourBlocks = new HoursBlocks(startingTime, endingTime);
    }

    addTodayTask(task, startingTime, endingTime) {
        return this._hourBlocks.addTask(task, startingTime, endingTime)
    }

    get todayTasks() {
        return this._hourBlocks.blockTasks
    }
}

export {Day};