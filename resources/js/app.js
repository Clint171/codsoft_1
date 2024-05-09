let tasks = [];

class Task {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}

tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const title = prompt('Enter the title');
    if(!title || title == null) {
        return;
    }
    const description = prompt('Enter the description');
    if(!description || description == null) {
        return;
    }
    const id = tasks.length + 1;
    const task = new Task(id, title, description);
    tasks.push(task);
    saveTasks();
    setTasks(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    setTasks(tasks);
}

function getTask(id) {
    return tasks.find(task => task.id === id);
}

function updateTask(id) {
    const task = getTask(id);
    if(!task) {
        alert('Task not found');
        return;
    }
    let title = prompt('Enter the new title');
    let description = prompt('Enter the new description');
    if(!title || title == null) {
        title = task.title;
    }
    if(!description || description == null) {
        description = task.description;
    }
    task.title = title;
    task.description = description;
    saveTasks();
    setTasks(tasks);
}

function getTasks() {
    return tasks;
}

function clearTasks() {
    tasks = [];
    saveTasks();
    setTasks(tasks);
    location.reload();
}

let setTasks = (tasks) => {
    const taskDiv = document.querySelector('.task-container');
    if(tasks.length === 0) {
        return;
    }
    taskDiv.innerHTML = '';
    for(let i in tasks){
        const task = tasks[i];
        taskDiv.innerHTML += `
        <div class="task" id="${task.id}">
                <div class="task-header">
                    <h2>${task.title}</h2>
                    <div class="task-options">
                        <iconify-icon icon="carbon:edit" width="30" height="30" onclick="updateTask(${task.id})"></iconify-icon>
                        <iconify-icon icon="ri:delete-bin-line" width="30" height="30" onclick="deleteTask(${task.id})"></iconify-icon>
                    </div>
                </div>
                <div class="task-body">
                    <p>${task.description}</p>
                </div>
            </div>
        `;
    }
}

setTasks(getTasks());

let clearTasksDiv = () => {
    const taskDiv = document.querySelector('task-container');
    taskDiv.innerHTML = '';
}