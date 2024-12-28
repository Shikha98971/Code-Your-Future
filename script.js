let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

// Function to render tasks
function renderTasks() {
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');

    // Clear the lists before rendering
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    // Render pending tasks
    pendingTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text} <small>(${task.date})</small></span>
            <button class="edit-btn" onclick="editTask(${index}, 'pending')">Edit</button>
            <button class="task-btn" onclick="completeTask(${index}, 'pending')">Complete</button>
            <button class="task-btn" onclick="deleteTask(${index}, 'pending')">Delete</button>
        `;
        pendingTasksList.appendChild(li);
    });

    // Render completed tasks
    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="completed">${task.text} <small>(${task.date})</small></span>
            <button class="edit-btn" onclick="editTask(${index}, 'completed')">Edit</button>
            <button class="task-btn" onclick="deleteTask(${index}, 'completed')">Delete</button>
        `;
        completedTasksList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        text: taskText,
        date: new Date().toLocaleString(),
    };

    pendingTasks.push(task);
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));

    taskInput.value = '';
    renderTasks();
}

// Function to mark a task as complete
function completeTask(index, listType) {
    let task;
    if (listType === 'pending') {
        task = pendingTasks.splice(index, 1)[0];
        completedTasks.push(task);
    } else {
        task = completedTasks.splice(index, 1)[0];
        pendingTasks.push(task);
    }

    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

    renderTasks();
}

// Function to delete a task
function deleteTask(index, listType) {
    if (listType === 'pending') {
        pendingTasks.splice(index, 1);
        localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    } else {
        completedTasks.splice(index, 1);
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }

    renderTasks();
}

// Function to edit a task
function editTask(index, listType) {
    const newTaskText = prompt('Edit task:', listType === 'pending' ? pendingTasks[index].text : completedTasks[index].text);
    if (newTaskText) {
        if (listType === 'pending') {
            pendingTasks[index].text = newTaskText;
        } else {
            completedTasks[index].text = newTaskText;
        }

        localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

        renderTasks();
    }
}

// Initial render of tasks
renderTasks();
