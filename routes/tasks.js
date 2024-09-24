import express from 'express';
import * as taskController from '../controllers/taskController.js'; //import all exported functions
import { verifyToken } from '../middlewares/authMiddleware.js' // import middleware
const router = express.Router();

// routes to get all tasks
router.get('/', verifyToken, taskController.getAllTasks);

// route to create a new task
router.post('/', verifyToken, taskController.createTask);

// route to update a task
router.put('/:id', verifyToken, taskController.updateTask);

// route to delete task
router.delete('/:id', verifyToken, taskController.deleteTask);

export default router;