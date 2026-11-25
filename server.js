import express from 'express';

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());

let tasks = [
    { id: 1, title: 'Вивчити Node.js', completed: false },
    { id: 2, title: 'Вивчити Express.js', completed: true },
    { id: 3, title: 'Виконати практичну роботу №5', completed: false }
];

let nextId = 4;

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            message: 'Назва завдання обов’язкова'
        });
    }

    const newTask = {
        id: nextId++,
        title: title.trim(),
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: 'Завдання не знайдено'
        });
    }

    task.completed = !task.completed;

    res.status(200).json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: 'Завдання не знайдено'
        });
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
});

app.get('/tasks', (req, res) => {
    res.render('tasks', { tasks });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
