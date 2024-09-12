import express from 'express';
import * as taskController from '../controllers/controller.js'; //import all exported functions

const router = express.Router();

// routes to get all tasks
router.get('/', taskController.getAllTasks);

// route to create a new task
router.post('/', taskController.createTask);

// route to update a task
router.put('/:id', taskController.updateTask);

// route to delete task
router.delete('/:id', taskController.deleteTask);

export default router;