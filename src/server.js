const express = require('express');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const todos = [{
    id: '123',
    text: 'Learn jQuery',
    isCompleted: false,
}, {
    id: '234',
    text: 'Go To Store',
    isCompleted: true,
}, {
    id: '345',
    text: 'Have Lunch',
    isCompleted: true,
}];

app.use(cors());
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.status(200).send("Hello!");
});

app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = req.body;
    todos.push({
        id: uuid(),
        ...newTodo,
    });
    res.status(200).json(todos);
});

app.put('/todos/:id/completed', (req, res) => {
    const { id } = req.params;
    todos = todos.map(todo => {
        if (todo.id !== id) return todo;
        return { ...todo, isCompleted: true };
    });
    res.status(200).json(todos);
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).json(todos);
});

app.listen(8000, () => console.log('Server is listening on port 8000'));