const addNewTaskInput = document.querySelector('#input-task');
const addNewTaskBtn = document.querySelector('#add-task-button');
const taskList = document.querySelector('#task-list');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const addNewTask = (task) => {
    const newTask = document.createElement('li');
    newTask.classList.add('task-item');
    newTask.innerHTML = `
            <input type="checkbox"  onclick="markAsComplete(this, ${task.id})">
            <span class="task ${task.completed ? 'strike-through' : ''}">${task.name}</span>
            <button type="button" class="delete-btn" onclick="deleteTask(this, ${task.id})">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"/>
                </svg>
            </button>
    `;
    taskList.appendChild(newTask);
};

addNewTaskBtn.addEventListener('click', () => {
    let taskName = addNewTaskInput.value;
    if (taskName.length > 0 && taskName !== '') {
        let newTask = {
            id: tasks.length + 1,
            name: taskName,
            completed: false,
            deleted: false
        };
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks))
        addNewTask(newTask);
        addNewTaskInput.value = '';
        addNewTaskBtn.disabled = true;
    }
});

window.onload = () => {
    tasks.forEach(task => {
        if (!task.deleted) {
            addNewTask(task);
        }
    });
};

const deleteTask = (obj, id) => {
    tasks.map(task => {
        if (task.id === id) {
            task.deleted = true;
            localStorage.setItem("tasks", JSON.stringify(tasks))
        }
    });
    obj.parentNode.remove();
};

const markAsComplete = (obj, id) => {
    tasks.map(task => {
        if (task.id === id) {
            task.completed = true;
            localStorage.setItem("tasks", JSON.stringify(tasks))
        }
    });
    const parent = obj.parentNode;
    parent.children.item(1).classList.toggle('strike-through');
};
