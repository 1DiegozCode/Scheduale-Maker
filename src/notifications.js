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

export { notifyTask }