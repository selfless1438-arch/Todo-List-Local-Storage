lucide.createIcons();

// short keys

document.addEventListener("keydown", function (e) {
    if (e.altKey && e.key.toLocaleLowerCase() === "m") {
        toggleMode();
    }
})

// Enabling 

const notitone = document.querySelector("#notitone");
const addTaskInput = document.getElementById("addTaskInput");
const tasksList = document.getElementById("tasks-list");
const emptyAlertModal = document.getElementById("emptyAlertModal");
const tasksCounter = document.getElementById("counter");

// close modal alert 

function closeAlert() {
    notitone.pause();
    notitone.currentTime = 0;
    emptyAlertModal.classList.remove('show');
}

// loading previous tasks
getTasksFromLocalStorage();


addTaskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNewTask()
    }
});

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}


function addNewTask() {
    const newTask = { task: addTaskInput.value.trim(), isDone: false };
    if (newTask.task === "") {
        notitone.play();
        emptyAlertModal.classList.add("show");
        return;
    }
    let tasks = getTasks();
    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskInput.value = "";
    getTasksFromLocalStorage();
}

function getTasksFromLocalStorage() {
    tasksList.innerHTML = "";
    let tasks = getTasks();
    let count = 0;

    lucide.createIcons();
    tasks.forEach((task, index) => {
        const taskdiv = document.createElement("div");
        if (task.isDone === true) {

            taskdiv.innerHTML = `
                <div class="task done">
                        <input type="checkbox" checked name="task" id="task" onclick="updateStatus(${index})">
                        <span class="task-title">${task.task}</span>
                        <div class="icon">
                            <i data-lucide="x" onclick="deleteTask(${index})" type="submit"></i>
                        </div>
                    </div>
            `
        } else {
            taskdiv.innerHTML = `
                <div class="task">
                        <input type="checkbox" name="task" id="task" onclick="updateStatus(${index})">
                        <span class="task-title">${task.task}</span>
                        <div class="icon">
                            <i data-lucide="x" onclick="deleteTask(${index})" type="submit"></i>
                        </div>
                    </div>
            `
            count++;
        }

        tasksList.appendChild(taskdiv);
        lucide.createIcons();
    });
    tasksCounter.innerHTML = count;
}

// Deleting task 

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    getTasksFromLocalStorage();
}

// update status 
function updateStatus(index) {
    let tasks = getTasks();

    tasks[index].isDone = !tasks[index].isDone;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    getTasksFromLocalStorage();
}

// toggel mode 
function toggleMode() {
    let mode = getMode();
    if (mode === "dark") {
        mode = "light";
    } else {
        mode = "dark";
    }
    localStorage.setItem("mode", mode);
    setMode();
}

function setMode() {
    const main = document.querySelector("main");
    const modeIcon = document.getElementById("modeIcon");
    let mode = getMode();
    if (mode === "dark") {
        main.classList.add("dark");
    } else {
        main.classList.remove("dark");
    }
}

setMode();

function getMode() {
    return localStorage.getItem("mode") || "light";
}
