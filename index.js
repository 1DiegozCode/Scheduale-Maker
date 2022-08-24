import { Week } from "./src/week.js"; 
import { Task, allTasks} from "./src/task.js"; 
import { renderWeekBlock } from "./src/render.js";

/*Por agregar: Interfaz de tareas por tipos agregadas y su busqueda recursiva en la semana, la tabla html a pdf*/ 
let newTaskForm = document.forms['NewTaskForm']
const userWeek = new Week("7:00", "17:00")
console.log(userWeek)

function addTask() {
    let taskName = document.getElementById("TaskName").value;
    let taskType = document.getElementById("TaskType").value;
    let taskColor = document.getElementById("TaskColor").value;
    let taskTime = document.getElementById("TaskTime").value;
    let taskInitTime = taskTime.split("-")[0];
    let taskEndTime = taskTime.split("-")[1];
    let taskDay = document.getElementById("TaskDay").value;
    let userTask = new Task(taskName, taskType, taskColor)
    userWeek.scheduleTask(taskDay, userTask, taskInitTime, taskEndTime)
    renderWeekBlock(userWeek)
    newTaskForm.reset();
    storeScheduale(userWeek)
}

function clearTasks() { 
    let taskTime = document.getElementById("TaskTime").value;
    let taskInitTime = taskTime.split("-")[0];
    let taskEndTime = taskTime.split("-")[1];
    let taskDay = document.getElementById("TaskDay").value.toLowerCase();
    userWeek[taskDay].clearTodayHoursBlock(taskInitTime, taskEndTime)
    renderWeekBlock(userWeek)
    newTaskForm.reset();
    storeScheduale(userWeek)
}



document.getElementById("AddTask").addEventListener("click", addTask)
document.getElementById("ClearTask").addEventListener("click", clearTasks)
console.log(allTasks)