import { renderAllTask } from "./src/render.js";
import { loaderImit } from "./src/loader.js"
import { allTasks } from "./src/task.js"; 
import { addTask, clearTasks, clearAllTask, updateFormDate, handleCreateTable } from "./src/handlers.js"


// Considerar modulo listeners

/*agregar una lista de colores predeterminada a la selección */

loaderImit()
recoverTasks()
renderAllTask()

function recoverTasks() {
    const lastTaskList = JSON.parse(localStorage.getItem('lastTaskList')) ? JSON.parse(localStorage.getItem('lastTaskList')) : []
    lastTaskList.forEach(task => allTasks.add(task))
}

function startWeek() {
    return new Promise((resolve) => {
        document.getElementById("CreateTable").addEventListener("click",() => handleCreateTable(resolve))
    })
}

let userWeek = await startWeek();

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


export { userWeek }