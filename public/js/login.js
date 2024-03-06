// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      // Store the token in local storage
      localStorage.setItem('token', token);
      // Redirect to the task list page
      window.location.href = '/';
    } else {
      // Handle login error
      console.error('Login failed');
    }
  });