function exactToExact(startingHour, endinghour){
    const blocksArray = []
    const minutes = {
        halfHour: "30",
        exactHour: "00"
    }
    let startingHourBlock = startingHour
    let endingHourBlock = startingHour
    for (let times = 0; times < (endinghour - startingHour) * 2; times++) {
        let firstBox = ""
        let secondBox = ""
        if (times % 2 === 0) {
            firstBox = `${startingHourBlock}:${minutes.exactHour}`;
            secondBox = `${endingHourBlock}:${minutes.halfHour}`;
            endingHourBlock += 1;
        } else {
            firstBox = `${startingHourBlock}:${minutes.halfHour}`;
            secondBox = `${endingHourBlock}:${minutes.exactHour}`;
            startingHourBlock += 1
        }
        let blockFormat = `${firstBox}-${secondBox}`;
        blocksArray.push(blockFormat);
    }
    return blocksArray
}


function halfToHalf(startingHour, endinghour){
    const blocksArray = []
    const minutes = {
        halfHour: "30",
        exactHour: "00"
    }
    let startingHourBlock = startingHour 
    let endingHourBlock = startingHour + 1
    for (let times = 0; times < (endinghour - startingHour) * 2; times++) {
        let firstBox = ""
        let secondBox = ""
        if (times % 2 === 0) {
            firstBox = `${startingHourBlock}:${minutes.halfHour}`;
            secondBox = `${endingHourBlock}:${minutes.exactHour}`;
            startingHourBlock += 1
        } else {
            firstBox = `${startingHourBlock}:${minutes.exactHour}`;
            secondBox = `${endingHourBlock}:${minutes.halfHour}`;
            endingHourBlock += 1;
        }
        let blockFormat = `${firstBox}-${secondBox}`;
        blocksArray.push(blockFormat);
    }
    return blocksArray
}


function exactToHalf(startingHour, endinghour){
    const blocksArray = []
    const minutes = {
        halfHour: "30",
        exactHour: "00"
    }
    let startingHourBlock = startingHour 
    let endingHourBlock = startingHour
    for (let times = 0; times < ((endinghour - startingHour) * 2) + 1; times++) {
        let firstBox = ""
        let secondBox = ""
        if (times % 2 === 0) {
            firstBox = `${startingHourBlock}:${minutes.exactHour}`;
            secondBox = `${endingHourBlock}:${minutes.halfHour}`;
            endingHourBlock += 1;
        } else {
            firstBox = `${startingHourBlock}:${minutes.halfHour}`;
            secondBox = `${endingHourBlock}:${minutes.exactHour}`;
            startingHourBlock += 1
        }
        let blockFormat = `${firstBox}-${secondBox}`
        blocksArray.push(blockFormat)
    }
    return blocksArray
}


function halfToExact(startingHour, endinghour){
    const blocksArray = []
    const minutes = {
        halfHour: "30",
        exactHour: "00"
    }
    let startingHourBlock = startingHour 
    let endingHourBlock = startingHour + 1

    for (let times = 0; times < ((endinghour - startingHour) * 2) - 1; times++) {
        let firstBox = ""
        let secondBox = ""
        if (times % 2 === 0) {
            firstBox = `${startingHourBlock}:${minutes.halfHour}`
            secondBox = `${endingHourBlock}:${minutes.exactHour}`
            startingHourBlock += 1
        } else {
            firstBox = `${startingHourBlock}:${minutes.exactHour}`
            secondBox = `${endingHourBlock}:${minutes.halfHour}`
            endingHourBlock += 1;
        }
        let blockFormat = `${firstBox}-${secondBox}`
        blocksArray.push(blockFormat);
    }
    return blocksArray
}

export {exactToExact, halfToHalf, exactToHalf, halfToExact};