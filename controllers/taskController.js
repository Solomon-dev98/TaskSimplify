import Task from '../models.task.js'; // import Task model

// get all tasks
export const getAllTasks = (req, res) => {
    res.send("Retrieve all tasks");
};

// Create a task
export const createTask = (req, res) => {
    res.send("Task created");
};

// update task
export const updateTask = (req, res) => {
    res.send(`Task with id ${req.params.id} updated`);
};

// delete task
export const deleteTask = (req, res) => {
    res.send(`Task with id ${req.params.id} deleted`);
};