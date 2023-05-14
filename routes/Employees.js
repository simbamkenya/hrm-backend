const express = require('express');
const { Employee } = require('../models/Employee');
const router = express.Router();
const _ = require('lodash');

//fetch all employees
router.get('/', async (req, res) => {
    const employeesList = await Employee.find();
    res.send(employeesList);
})

//create new employee
router.post('/', async (req, res) => {
    let post = new Employee(req.body, _.pick(['name', 'email', 'phone']));
    post = await post.save();

    res.send(post)    
})

//delete an employee
router.delete('/:id', async (req, res) => {
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if(!employee) return res.status(400).send('Employee with given id couldnt be deleted');

    res.send(employee);
})
module.exports = router;