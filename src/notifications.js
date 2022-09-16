function notifyTask(taskName, taskDay, taskInitTime, taskEndTime){
    const message = `Task '${taskName}' has been added,
    on ${taskDay}, from ${taskInitTime} to ${taskEndTime}.`
    Toastify({
        text: message,
        duration: 3500,
        gravity: "top", 
        stopOnFocus: true, 
        style: {
            background: "whitesmoke",
            color: "black",
        }
    }).showToast();
}

function notifyTaskError(){
    const message = `Invalid input!
    Check if the time is correct
    or a task is scheduled in the time
    range.`
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "top", 
        position: "center",
        stopOnFocus: true, 
        style: {
            background: "red",
            color: "black",
            'text-align': "center"
        }
    }).showToast();
}

export { notifyTask, notifyTaskError }