
let tasks = [];

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Add new task
function addTask() {
    const description = taskInput.value.trim();

    if (description === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        description: description,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";

    const sortedTasks = [
        ...tasks.filter(task => !task.completed),
        ...tasks.filter(task => task.completed)
    ];

    sortedTasks.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.description;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        li.append(checkbox, span, deleteButton);

        taskList.appendChild(li);
    });
}

// Complete or uncomplete task
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    renderTasks();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    renderTasks();
}

// Add button event
addButton.addEventListener("click", addTask);

// Add task using Enter
taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();
