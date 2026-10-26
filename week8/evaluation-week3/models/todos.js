const mongoose = require('./connection');

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;

