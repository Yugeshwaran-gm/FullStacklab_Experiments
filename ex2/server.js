const express = require('express');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// View Engine Setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('form');
});

app.post('/submit', (req, res) => {
  const formData = req.body;

  // Save to JSON file
  fs.writeFile('data.json', JSON.stringify(formData, null, 2), (err) => {
    if (err) return res.status(500).send('Error saving data.');
    res.redirect('/result');
  });
});

app.get('/result', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading data.');
    const student = JSON.parse(data);
    res.render('result', { student });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
