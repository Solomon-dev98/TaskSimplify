import Task from '../models/task.js'; // import Task model

// get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.getAll(); // fetch all tasks
        if (tasks.length === 0) {
            return res.status(200).json({ success: true, message: 'No tasks found', tasks: [] }); // Include an explicit message
        }
        res.status(200).json(tasks); // Return tasks as JSON
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};

// Create a task
export const createTask = async (req, res) => {
    const { title, description, due_date } = req.body;
    console.log('Due date received:', due_date);

    
    try {
        await Task.create({ title, description, due_date }); //create a new task
        res.status(201).json({success: true, message: 'Task created successfully'}); //Success response
    } catch (error) {
        console.error('Error creating task: ', error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};

// update task
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, due_date } = req.body;

    try {
        await Task.update(id, { title, description, due_date });// update the task
        res.status(200).json({success: true, message: 'Task updated successfully'}); // Success response 
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};

// delete task
export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await Task.delete(id); // Delete the tasks
        res.status(200).json({success: true, message: 'Task deleted successfully'}); // Success response
    } catch (error) {
        console.error('Error deleting task', error);
        res.status(500).json({success: false, message: "'Server error'"});
    }
};