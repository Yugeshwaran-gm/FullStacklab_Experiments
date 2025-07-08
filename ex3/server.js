const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Student = require('./models/student');

const app = express();
const PORT = 3000;

// DB
mongoose.connect('mongodb+srv://yugeshwarang24mca:Yugeshg@devops-project.qsqvcgh.mongodb.net/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => res.redirect('/form.html'));

app.post('/create', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.redirect('/students');
});

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.render('students', { students });
});

app.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.send("Student not found");

  res.send(`
    <html>
    <head><link rel="stylesheet" href="/styles.css"></head>
    <body>
      <h2>Edit Student</h2>
      <form action="/update/${student._id}" method="POST">
        Name: <input type="text" name="name" value="${student.name}" required><br><br>
        Email: <input type="email" name="email" value="${student.email}" required><br><br>
        Age: <input type="number" name="age" value="${student.age}" required><br><br>
        <button type="submit">Update</button>
      </form>
      <br><a href="/students">Back to List</a>
    </body>
    </html>
  `);
});

app.post('/update/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/students');
});

app.get('/delete/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/students');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
