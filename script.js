
const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");
const taskCount = document.querySelector(".task-count");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });
    saveTasks();

    taskInput.value = "";

    displayTasks();
});


function displayTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(function(task) {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(function(task) {
        const listItem = document.createElement("li");
        const taskText = document.createElement("span");

        taskText.textContent = task.text;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        taskText.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(currentTask) {
    return currentTask !== task;
});

saveTasks();
displayTasks();
        });

        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });

    const remainingTasks = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    taskCount.textContent = remainingTasks + " tasks remaining";
}

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();
    });
});
displayTasks();


        
