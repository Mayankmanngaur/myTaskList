const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.sort((a, b) => b.createdAt - a.createdAt);

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task ${task.completed ? 'completed' : ''}`;

        const span = document.createElement('span');
        span.textContent = task.name;
        span.onclick = () => toggleComplete(index);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'X';
        delBtn.onclick = () => deleteTask(index);

        li.append(span, delBtn);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false, createdAt: Date.now() });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener('click', addTask);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
        renderTasks(button.dataset.filter);
    });
});

renderTasks();
