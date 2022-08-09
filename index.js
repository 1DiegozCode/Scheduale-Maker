import { HoursBlocks } from "./src/hours_blocks.js";
import { Day } from "./src/day.js";
import { Week } from "./src/week.js"; 
import { Task, taskTypesAdd, getTypeTask } from "./src/task.js"; 


function addTaskTest(week) {
    const firstMessage = 'Now, enter some tasks'
    alert(firstMessage)
    let keepLoging = true
    while (keepLoging) {
        const newTaskMessage = 'Lets create a new Task!'
        alert(newTaskMessage)
        const newUserTaskName = prompt('Type your task name')
        const newUserTaskType = prompt('Type your task type')
        const newUserTaskColor = prompt('Type your task color')

        const addTaskMessage = 'Now add your task the week'
        alert(addTaskMessage)
        const taskDay = prompt('Type the task day')
        const taskBeginningHour = prompt('Type task beginning hour |24 hour format')
        const taskEndingHour = prompt('Type task ending hour|24 hour format')

        const newUserTask = new Task(newUserTaskName, newUserTaskType, newUserTaskColor)
        week.scheduleTask(taskDay, newUserTask, taskBeginningHour, taskEndingHour)
        const userPrompt = prompt('Do you wanna enter a new task? Y|N')
        keepLoging = userPrompt == 'Y' ? true : false
    }
    return 'Succeed'
}



const header = 
`
*********************************************
        Welcome to Easy ScheduleMaker
*********************************************
`
alert(header)
const weekTimeBeginning = prompt('Lets create a new week! Type the beginning hour| Use 24 hour format, example: "6:30" or "5:00", only use half hours or whole hours')
const weekTimeEnding = prompt('Lets create a new week! Type the ending hour| Use 24 hour format, example: "16:30" or "20:00", only use half hours or whole hours')
const userWeek =  new Week(weekTimeBeginning, weekTimeEnding)

console.log("Creation of the user's week")
console.log(userWeek)

console.log(addTaskTest(userWeek))

alert('You end the Easy SheduleMaker pre-alpha test, take a look in your console to see the week')
console.log('Your week schedule')
console.log(userWeek)
console.log('Add Tasks, classified by their types \n')
console.log(taskTypesAdd)
console.log('Week Tasks')
console.log(userWeek.weekTasks)