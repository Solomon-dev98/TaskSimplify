import db from '../config/db.js';

// Task model with different methods

const Task = {
    getAll: () => db.any('SELECT * FROM tasks'),
    create: (taskData) => db.none('INSERT INTO tasks(title, description, due_date) VALUES($1, $2, $3)', [taskData.title, taskData.description, taskData.due_date]),
    update: (id, taskData) => db.none('UPDATE tasks SET title=$1, description=$2, due_date=$3 WHERE id=$4', [taskData.title, taskData.description, taskData.due_date, id]),
    delete: (id) => db.none('DELETE FROM tasks WHERE id=$1', [id]),
};

export default Task;