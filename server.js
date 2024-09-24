// import modules
import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';


const app = express();
const port = 3000;

app.use(bodyParser.json()); // middleware for parsing JSON

//use the routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});