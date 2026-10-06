const db = require('./database/setup'); // Do not edit/remove this line


// Create todo with name and priority (done = false by default)
function createTodo(name, priority) {
  const todo = new db({
    name: name,
    priority: priority,
    done: false,
  });

  return todo.save();
}


// Complete one todo by name (update property done = true)
async function completeTodo(name) {
  await db.updateOne(
    { name: name },
    { done: true }
  );
}


// Delete one todo by name
async function deleteTodo(name) {
  await db.deleteOne({ name: name });
}

// deleteTodo('Learn Mongoose');
module.exports = { createTodo, completeTodo, deleteTodo }; // Do not edit/remove this line
