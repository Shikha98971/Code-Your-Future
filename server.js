const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

// Body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

// Fake database of users (In real-world applications, use a proper database)
let users = [];

// Serve static files like HTML, CSS, JS
app.use(express.static('public'));

// Register Route - Show Registration Form
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

// Login Route - Show Login Form
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Home Route - Show Homepage (Secured)
app.get('/home', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + '/public/home.html');
  } else {
    res.redirect('/login');
  }
});

// Handle Registration (POST request)
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.send('User already exists. Please login.');
  }

  // Add new user to the fake database
  users.push({ username, password });
  res.send('Registration successful! <a href="/login">Login here</a>');
});

// Handle Login (POST request)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect('/home');
  } else {
    res.send('Invalid credentials. Please try again.');
  }
});

// Logout Route - Clear Session
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
