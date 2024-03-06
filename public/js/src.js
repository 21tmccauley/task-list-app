// Get all tasks
async function getTasks() {
    const token = localStorage.getItem('token');
    const response = await fetch('/tasks', {
      headers: {
        'Authorization': token
      }
    });
    const tasks = await response.json();
    renderTasks(tasks);
  }
  
  // Render tasks
  function renderTasks(tasks) {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';
  
    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.innerHTML = `
        <div class="task-header">
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <div class="task-actions">
          <button class="edit-task" data-task-id="${task._id}">Edit</button>
          <button class="delete-task" data-task-id="${task._id}">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  }
  
  // Create a new task
  async function createTask(title, description) {
    const token = localStorage.getItem('token');
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ title, description })
    });
    if (response.ok) {
      getTasks();
    }
  }
  
  // Update a task
  async function updateTask(taskId, title, description) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ title, description })
    });
    if (response.ok) {
      getTasks();
    }
  }
  
  // Delete a task
  async function deleteTask(taskId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    });
    if (response.ok) {
      getTasks();
    }
  }
  
  // Event delegation for create, update, and delete tasks
  document.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (e.target.id === 'addTaskForm') {
      const title = e.target.elements.title.value;
      const description = e.target.elements.description.value;
      await createTask(title, description);
      e.target.reset();
    }
    if (e.target.id === 'editTaskForm') {
      const taskId = e.target.dataset.taskId;
      const title = e.target.elements.title.value;
      const description = e.target.elements.description.value;
      await updateTask(taskId, title, description);
      e.target.reset();
    }
  });
  
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-task')) {
      const taskId = e.target.dataset.taskId;
      await deleteTask(taskId);
    }
    if (e.target.classList.contains('edit-task')) {
      const taskId = e.target.dataset.taskId;
      // TODO: Populate the edit form with the task details
    }
  });
  
  // Call getTasks when the page loads
  getTasks();