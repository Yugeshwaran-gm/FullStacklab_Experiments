const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Handlebars setup
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit', (req, res) => {
    const formData = req.body;
    fs.writeFileSync('data.json', JSON.stringify(formData, null, 2));
    res.redirect('/display');
});

app.get('/display', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    res.render('display', { data });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
