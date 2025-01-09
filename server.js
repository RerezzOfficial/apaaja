const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware untuk membaca data JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Melayani file statis
app.use(express.static(path.join(__dirname, 'public')));

app.get('/auth/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Endpoint untuk login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const accounts = JSON.parse(fs.readFileSync('akun.json', 'utf-8'));

  const user = accounts.find(
    (account) => account.username === username && account.password === password
  );

  if (user) {
    res.status(200).json({ success: true, message: 'Login berhasil!' });
  } else {
    res.status(401).json({ success: false, message: 'Username atau password salah!' });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
