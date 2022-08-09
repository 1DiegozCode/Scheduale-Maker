import {Day} from './day.js';


class Week {
    constructor(startingTime, endingTime) {
        this._monday = new Day("MONDAY", startingTime, endingTime);
        this._tuesday = new Day("TUESDAY", startingTime, endingTime);
        this._wednesday = new Day("WEDNESDAY", startingTime, endingTime);
        this._thursday = new Day("THURSDAY", startingTime, endingTime);
        this._friday = new Day("FRIDAY", startingTime, endingTime);
        this._saturday = new Day("SATURDAY", startingTime, endingTime);
        this._sunday = new Day("SUNDAY", startingTime, endingTime);
    }

    scheduleTask(day, task, startingTime, endingTime) {
        const daySelector = `_${day.toLowerCase()}`;
        return this[daySelector].addTodayTask(task, startingTime, endingTime)
    }

    get weekTasks() {
        return Object.keys(this).reduce((weekTaskesArray, weekDay) => weekTaskesArray.concat(this[weekDay].todayTasks), [])
    }
}

export {Week};