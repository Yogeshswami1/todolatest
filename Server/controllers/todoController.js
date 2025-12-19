import Todo from "../models/Todo.js";

// GET
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};


// POST
export const createTodo = async (req, res) => {
  const todo = await Todo.create({ title: req.body.title });
  res.status(201).json(todo);
};

// PUT
export const toggleTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};

// DELETE
export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
