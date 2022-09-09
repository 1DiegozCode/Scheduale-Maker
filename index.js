import { Week } from "./src/week.js"; 
import { renderAllTask } from "./src/render.js";
import { loaderImit } from "./src/loader.js"
import { allTasks } from "./src/task.js"; 
import { addTask, clearTasks, clearAllTask, updateFormDate } from "./src/handlers.js"

/*Por agregar: Interfaz de tareas por tipos agregadas y su busqueda recursiva en la semana, la tabla html a pdf*/
// Considerar modulo listeners
loaderImit()
recoverTasks()
renderAllTask()

const userWeek = new Week("7:00", "17:00")

function recoverTasks() {
    const lastTaskList = JSON.parse(localStorage.getItem('lastTaskList')) ? JSON.parse(localStorage.getItem('lastTaskList')) : []
    lastTaskList.forEach(task => allTasks.add(task))
}

function addListenerToTD() {
    const scheduleTable = document.getElementById("ScheduleTable")
    const allCellsArray = Array.prototype.slice.call(scheduleTable.getElementsByTagName("td"))
    const dateCellsArray = allCellsArray.filter(element => !(element.getAttribute("class") === "table-secondary") )
    dateCellsArray.forEach(td => td.setAttribute("data-bs-toggle","modal"))
    dateCellsArray.forEach(td => td.setAttribute("data-bs-target","#AddTaskModal"))
    dateCellsArray.forEach(td => td.addEventListener("click", () => updateFormDate(td)))
}

const requestInformation = fetch("./info.json")
                            .then((response) => response.json())
                            .then((json) => {
                                const {author, acknowledgments, purpose, version} = json
                                const credits = document.getElementById("Information")
                                credits.innerHTML = `<p>
                                    Author: ${author}<br>
                                    Acknowledgments: ${acknowledgments}<br>
                                    Purpose: ${purpose}<br>
                                    Version: ${version}<br>
                                </p>` 
                            })

document.getElementById("AddTask").addEventListener("click", addTask)
document.getElementById("ClearTask").addEventListener("click", clearTasks)
document.getElementById("ClearTaskList").addEventListener("click", clearAllTask)
addListenerToTD()
console.log(allTasks)

export { userWeek }