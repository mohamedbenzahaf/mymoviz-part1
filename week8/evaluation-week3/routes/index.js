var express = require('express');
var router = express.Router();
// DO NOT EDIT OVER THIS LINE //



const Todo = require('../models/todos');

// ROUTE GET /todos
router.get('/todos', async (req, res) => {
const todos = await Todo.find({}, { __v: 0 });

  res.json({ todos });
});

// ROUTE POST /todos
router.post('/todos', async (req, res) => {
  const { title, priority } = req.body;

  const newTodo = new Todo({ title, priority });
  await newTodo.save();

  res.json({ result: true });
});


// DO NOT EDIT UNDER THIS LINE //
module.exports = router;
