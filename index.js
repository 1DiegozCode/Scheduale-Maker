import { HoursBlocks } from "./src/hours_blocks.js";
import { Day } from "./src/day.js";
import { Week } from "./src/week.js"; 
import { Task, taskTypesAdd, getTypeTask } from "./src/task.js"; 


const header = 
`


*********************************************
*--------PROVISIONAL TESTS 24/07/2022-------*
*********************************************


`
console.log(header)
//Provisional Tests
//hour_blocks.js module

let testBlock = new HoursBlocks("5:30","12:00")
console.log("\n\nHours Block from 5:30 to 12:00\n\n")
console.log(testBlock)

//day.js module
let testDay = new Day("SATURDAY", "10:00", "14:30")
console.log("\n\nDay, Saturday from 10:00 to 14:30\n\n")
console.log(testDay)

//week.js module
let testWeek = new Week("6:00", "19:00");
console.log("\n\nWeek from 6:00 to 19:00\n\n")
console.log(testWeek)

//task.js module
let testTask = new Task("This is a Test", "study", "green")
console.log("\n\nStudy task, color green\n\n")
console.log(testTask)

/*Checking that when a new instance of task is create, this task is add to the correct 
type of task set*/
console.log(taskTypesAdd);

//Adding tasks directly to the block test, modules: task.js, hour_blocks.js
console.log("\n\nAdding tasks directly to the block test\n\n")
console.log(testBlock.addTask(testTask, "7:00", "9:30"));
console.log(testBlock)

//Checking block tasks test, modules: task.js, hour_blocks.js
console.log("\n\nTasks of testBlock\n\n")
console.log(testBlock.blockTasks)

//Adding tasks directly to the day test, modules: day.js, hour_blocks.js
console.log("\n\nAdding tasks directly to the day test\n\n")
console.log(testDay.addTodayTask(testTask, "13:00", "14:00"))
console.log(testDay)

//Checking daytasks test, modules: day.js, hour_blocks.js
console.log("\n\nTasks of testDay\n\n")
console.log(testDay.todayTasks)

//Adding task directly from the testWeek , modules: week.js, hour_blocks.js

console.log("\n\nAdding tasks directly to the week test\n\n")
console.log(testWeek.scheduleTask("friday", testTask, "12:00", "13:30"))
console.log(testWeek)

