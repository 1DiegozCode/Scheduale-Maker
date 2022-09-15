import { renderAllTask } from "./src/render.js";
import { loaderImit } from "./src/loader.js"
import { allTasks } from "./src/task.js"; 
import { addTask, clearTasks, clearAllTask, updateFormDate, handleCreateTable } from "./src/handlers.js"

/*Por agregar: Interfaz de tareas por tipos agregadas y su busqueda recursiva en la semana, la tabla html a pdf*/
// Considerar modulo listeners

/*Ya se pueden crear tablas de horario de manera dinamica, y son completamente interactivas con el
usuario. Hay que modificar el flujo de trabajo para que el usuario cree la tabla segun el rango que 
necesite y los días de la semana que requiera. Verificar que añadir tareas reciba solamnte horas 
que tienen sentido usar. No se ha eliminado todavia la tabla original. Hay que agregar el modal 
de notificación que explica como funciona la aplicacion, luego de que la tabla se haya generado 
satisfactoriamente a manera de notificacion, tambien se debe ordenar create table, y el usuario
debe poder nombrar su tabla com quiera. agregar una lista de colores predeterminada a la selección */

/*Usar un regex y replace para limpiar las cadenas de entrada de las horas*/ 
loaderImit()
recoverTasks()
renderAllTask()


function startWeek() {
    return new Promise((resolve) => {
        document.getElementById("CreateTable").addEventListener("click",() => handleCreateTable(resolve))
    })
}

let userWeek = await startWeek();

function recoverTasks() {
    const lastTaskList = JSON.parse(localStorage.getItem('lastTaskList')) ? JSON.parse(localStorage.getItem('lastTaskList')) : []
    lastTaskList.forEach(task => allTasks.add(task))
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


export { userWeek }