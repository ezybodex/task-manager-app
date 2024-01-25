const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// const controller = require('./taskController')

let tasks = [];

// GET endpoint to retrieve tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// POST endpoint to create a task
app.post('/api/tasks', (req, res) => {
    const { title, category, description, dueDate } = req.body;
    const task = { title, category, description, dueDate, completed: false };
    tasks.push(task);
    res.json(tasks);
    // res.json({ success: true });
});

// PUT endpoint to complete a task
app.put('/api/tasks/:index', (req, res) => {
    const { index } = req.params;
    tasks[index].completed = true;
    res.json(tasks);
    // res.json({ success: true });
});

//new

// GET endpoint to retrieve tasks sorted by due date
app.get('/api/tasks', (req, res) => {
    const sortedTasks = tasks.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    res.json(sortedTasks);
});


// new



app.delete('/api/tasks/:index', (req, res) => {
    const { index } = req.params;
    tasks.splice(index, 1);
    res.json(tasks);
    // res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});