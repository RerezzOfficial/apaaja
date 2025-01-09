document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  const message = document.getElementById('message');

  if (result.success) {
    message.style.color = 'green';
    message.textContent = result.message;
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  } else {
    message.style.color = 'red';
    message.textContent = result.message;
  }
});
