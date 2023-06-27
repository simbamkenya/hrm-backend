const express = require('express')
const { Employee } = require('../models/Employee')
const router = express.Router()
const _ = require('lodash')
const { validateEmployee } = require('../utils')

//fetch all employees
router.get('/', async (req, res) => {
  const employeesList = await Employee.find()
  if (!employeesList) return res.status(400).send('could not fetch employees')
  res.send(employeesList)
})

//fetch an employee
router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id)
  if (!employee)
    return res.status(400).send('could not fetch employee with given Id')

  res.send(employee)
})

//create new employee
router.post('/', async (req, res) => {
  const { error } = validateEmployee(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let post = new Employee(req.body, _.pick(['firstName', 'email', 'lastName']))
  post = await post.save()

  res.send(post)
})

//delete an employee
router.delete('/:id', async (req, res) => {
  console.log('id', req.params.id)
  const employee = await Employee.findByIdAndRemove(req.params.id)
  if (!employee)
    return res.status(400).send('Employee with given id couldnt be deleted')

  res.send(employee)
})

//update an employee
router.put('/:id', async (req, res) => {
  const { error } = validateEmployee(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    { new: true }
  )
  res.send(employee)
})
module.exports = router
