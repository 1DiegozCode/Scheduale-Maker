import { Week } from "./src/week.js"; 
import { Task, allTasks} from "./src/task.js"; 
import { renderWeekBlock, renderAllTask } from "./src/render.js";

/*Por agregar: Interfaz de tareas por tipos agregadas y su busqueda recursiva en la semana, la tabla html a pdf*/
recoverTasks()
renderAllTask()


let newTaskForm = document.forms['NewTaskForm']
const userWeek = new Week("7:00", "17:00")
console.log(userWeek)

function notifyTask(taskName, taskDay, taskInitTime, taskEndTime){
    const message = `Task '${taskName}' has been added,
    on ${taskDay}, from ${taskInitTime} to ${taskEndTime}.`
    Toastify({
        text: message,
        duration: 1500,
        gravity: "top", 
        stopOnFocus: true, 
        style: {
            background: "whitesmoke",
            color: "black",
        }
    }).showToast();
}

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
    saveTasks() 
    renderAllTask();
    notifyTask(taskName, taskDay, taskInitTime, taskEndTime)
}

function clearTasks() { 
    let taskTime = document.getElementById("TaskTime").value;
    let taskInitTime = taskTime.split("-")[0];
    let taskEndTime = taskTime.split("-")[1];
    let taskDay = document.getElementById("TaskDay").value.toLowerCase();
    userWeek[taskDay].clearTodayHoursBlock(taskInitTime, taskEndTime)
    renderWeekBlock(userWeek)
    newTaskForm.reset();
}

function saveTasks() {
    const taskList = [...allTasks]
    const taskListJSON = JSON.stringify(taskList)
    localStorage.setItem('lastTaskList', taskListJSON);
}

function recoverTasks() {
    const lastTaskList = JSON.parse(localStorage.getItem('lastTaskList')) ? JSON.parse(localStorage.getItem('lastTaskList')) : []
    lastTaskList.forEach(task => allTasks.add(task))
}

function clearAllTask() { 
    allTasks.clear()
    saveTasks()
    renderAllTask()
}



document.getElementById("AddTask").addEventListener("click", addTask)
document.getElementById("ClearTask").addEventListener("click", clearTasks)
document.getElementById("ClearTaskList").addEventListener("click", clearAllTask)
console.log(allTasks)
console.log()