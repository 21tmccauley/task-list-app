document.getElementById('addTaskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = localStorage.getItem('token');
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Authorization': token
      },
      body: formData
    });
    if (response.ok) {
      // Refresh the task list
      getTasks();
    }
  });
  
  // Edit Task Form Submission
  document.getElementById('editTaskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskId = e.target.action.split('/').pop();
    const token = localStorage.getItem('token');
    const response = await fetch(`/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Authorization': token
      },
      body: formData
    });
    if (response.ok) {
      // Refresh the task list
      getTasks();
    }
  });
  
  // Delete Task
  async function deleteTask(taskId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    });
    if (response.ok) {
      // Refresh the task list
      getTasks();
    }
  }
  
  // Get Tasks
  async function getTasks() {
    const token = localStorage.getItem('token');
    const response = await fetch('/tasks', {
      headers: {
        'Authorization': token
      }
    });
    const tasks = await response.json();
    // TODO: Update the task list in the UI with the retrieved tasks
  }