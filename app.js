const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = [
    {
        id: 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true,
        priority: "high", // Added for extensions
        creationDate: new Date("2023-01-01") // Added for extensions
    }
];

// Helper for unique ID
const getNextId = () => {
    return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
};

// Validation Helper
const validateTask = (task) => {
    if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') {
        return "Title is required and must be a non-empty string.";
    }
    if (!task.description || typeof task.description !== 'string' || task.description.trim() === '') {
        return "Description is required and must be a non-empty string.";
    }
    if (task.completed !== undefined && typeof task.completed !== 'boolean') {
        return "Completed status must be a boolean.";
    }
    return null;
};

// GET /tasks
app.get('/tasks', (req, res) => {
    let result = [...tasks];

    // Filtering by completed status
    if (req.query.completed) {
        const isCompleted = req.query.completed === 'true';
        result = result.filter(t => t.completed === isCompleted);
    }

    // Sorting by creation date
    if (req.query.sort === 'creationDate') {
        result.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
    }

    res.status(200).json(result);
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send("Task not found");
    }
    res.status(200).json(task);
});

// GET /tasks/priority/:level
app.get('/tasks/priority/:level', (req, res) => {
    const level = req.params.level;
    const filteredTasks = tasks.filter(t => t.priority === level);
    res.status(200).json(filteredTasks);
});

// POST /tasks
app.post('/tasks', (req, res) => {
    const error = validateTask(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    const newTask = {
        id: getNextId(),
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false,
        priority: req.body.priority || 'medium',
        creationDate: new Date()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).send("Task not found");
    }

    const error = validateTask(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;
    if (req.body.priority) task.priority = req.body.priority;

    res.status(200).json(task);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).send("Task not found");
    }

    tasks.splice(taskIndex, 1);
    res.status(200).send("Task deleted");
});

if (require.main === module) {
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
}



module.exports = app;