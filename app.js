const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('express-async-errors')
const employeesRouter = require('./routes/Employees');
const clientsRouter = require('./routes/Clients');
const eventsRouter = require('./routes/Events');
const projectsRouter = require('./routes/Projects')
const errorHandler = require('./errorHandler');
const Joi = require('joi')

const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.DATABASE_URL;

//middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use('*', cors());


mongoose.connect(connectionString).then(
    console.log('connected to db')
)

app.use('/employees', employeesRouter);
app.use('/clients', clientsRouter);
app.use('/events', eventsRouter);
app.use('/projects', projectsRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('hello')
})
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})