const express = require('express')
const { User } = require('../models/User')
const { validateUser, validateLogin } = require('../utils')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//fetching user
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) res.status(400).send('user with given id was not found')

  res.send(user)
})

//fetching user
router.get('/', async (req, res) => {
  const user = await User.find()
  if (!user) res.status(400).send('user with given id was not found')

  res.send(user)
})

//registering new user
router.post('/register', async (req, res) => {
  console.log(req.body)
  const { error } = validateUser(req.body)
  if (error) return res.send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.send('user with this email is already registered')

  user = new User(_.pick(req.body, ['name', 'password', 'email']))

  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(user.password, salt)
  user.password = hashedPass
  user = await user.save()

  res.send(_.pick(user, ['_id', 'name', 'email']))
})

//login
router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body)
  if (error) return res.send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  console.log(user)
  if (!user) return res.send('invalid email or password')

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.send('couldnt login')

  const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey')
  res.header('x-auth-header', token)
  return res.send(token)
})

//deleting a user
router.delete(':/id', async (req, res) => {})

module.exports = router
