// In a real-world scenario, this file would handle database interactions using Sequelize
// For simplicity, we are using an array to store tasks

let tasks = [];

exports.createTask = (req, res) => {
    const { title, category, description, dueDate } = req.body;
    const task = { title, category, description, dueDate, completed: false };
    tasks.push(task);
    res.json({ success: true });
};

exports.getTasks = (req, res) => {
    res.json(tasks);
};

exports.completeTask = (req, res) => {
    const { index } = req.params;
    tasks[index].completed = true;
    res.json({ success: true });
};

