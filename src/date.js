function getInitEndTimeArray(time) {
    return time.split('-')
}


class Date {
    constructor(time, day) {
        this._time = time
        this._day = day
        this._initTime = getInitEndTimeArray(time)[0]
        this._endTime = getInitEndTimeArray(time)[1]
    }

    get time() {
        return this._time
    }

    get day() {
        return this._day
    }

    get initTime() {
        return this._initTime
    }

    get endTime() {
        return this._endTime
    }
}

export { Date, getInitEndTimeArray }