import { createHourArray } from "./hours_blocks.js";


function createTableHeader(addWeekends) {
    let headerInfo = ['HOUR', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    if (!addWeekends) {
        headerInfo = headerInfo.slice(0, 6);
    }
    const headerTableRow = document.getElementById("UserTable_HeaderTableRow");
    for (const title of headerInfo) {
        const tableHeaderRowData = document.createElement('th');
        tableHeaderRowData.textContent = title;
        headerTableRow.appendChild(tableHeaderRowData);
    }
}

function createTableRows(initTime, endTime) {
    const userHourArray = createHourArray(initTime, endTime);
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

function createTableCells(initTime, endTime, addWeekends) {
    let userDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    if (!addWeekends) {
        userDays = userDays.slice(0, 5);
    }
    const userHourArray = createHourArray(initTime,endTime);
    for (const hour of userHourArray) {
        const currenDayRow = document.getElementById(hour);
        for (const day of userDays) {
            const newTableCell = document.createElement('td');
            newTableCell.setAttribute('id', `${day}_${hour}`);
            currenDayRow.appendChild(newTableCell)
        }
    }
}

export { createTableHeader, createTableRows, createTableCells }