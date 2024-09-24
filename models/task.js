import db from '../config/db.js';

// Task model with different methods

const Task = {
    getAll: () => db.any('SELECT * FROM tasks'),
    create: (taskData) => db.none('INSERT INTO tasks(title, description) VALUES($1, $2)', [taskData.title, taskData.description]),
    update: (id, taskData) => db.none('UPDATE tasks SET title=$1, description=$2 WHERE id=$3', [taskData.title, taskData.description, id]),
    delete: (id) => db.none('DELETE FROM tasks WHERE id=$1', [id]),
};

export default Task;