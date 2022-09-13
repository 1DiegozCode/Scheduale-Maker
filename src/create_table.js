import { createHourArray } from "./hours_blocks.js";
import { getInitEndTimeArray } from "./date.js"
import { Week } from "./week.js";



function createUserTableWeek(userTime) {
    const userTable = document.getElementById("UserTable")
    const [startingTimeArray, endingTimeArray] = getInitEndTimeArray(userTime)
    const userWeek = new Week(startingTimeArray, endingTimeArray)
    console.log(userWeek)
}

function createTableHeader() {
    const headerInfo = ['HOUR', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const headerTableRow = document.getElementById("UserTable_HeaderTableRow");
    for (const title of headerInfo) {
        const tableHeaderRowData = document.createElement('th');
        tableHeaderRowData.textContent = title;
        headerTableRow.appendChild(tableHeaderRowData);
    }
}

function createTableRows() {
    const userHourArray = createHourArray('8:00','16:00');
    const userTableBody = document.getElementById('UserTable_Body');
    for (const hour of userHourArray) {
        const tableBodyRow = document.createElement('tr');
        tableBodyRow.setAttribute('id', hour);
        tableBodyRow.appendChild(createHourData(hour));
        userTableBody.appendChild(tableBodyRow);
    }
}

function createHourData(hour) {
    const tableHourData = document.createElement('td');
    tableHourData.textContent = hour;
    tableHourData.setAttribute('class', 'table-secondary');
    return tableHourData
}

function createTableCells() {
    const userDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const userHourArray = createHourArray('8:00','16:00');
    for (const hour of userHourArray) {
        const currenDayRow = document.getElementById(hour);
        for (const day of userDays) {
            const newTableCell = document.createElement('td');
            newTableCell.setAttribute('id', `${day}_${hour}`);
            currenDayRow.appendChild(newTableCell)
        }
    }
}

export { createUserTableWeek, createTableHeader, createTableRows, createTableCells }