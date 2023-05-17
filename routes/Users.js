const express = require("express");
const { User } = require("../models/User");
const { validateUser } = require("../utils");
const router = express.Router();
const _ = require('lodash');
const bcrypt =require('bcrypt')


//fetching user
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) res.status(400).send('user with given id was not found')

    res.send(user)
})

//registering new user
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if(!error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne(req.body.email)
    if(user) return res.send(400).send('user with this email is already registered')

    user = new User(_.pick(req.body, ['name', 'password', 'email']))

    const salt = await bycrpt.genSalt(10)
    const hashedPass = await bcrypt.hash(user.password, salt)
    user.password = hashedPass;
    user = await user.save()

    res.send(_.pick(user, ['_id', 'name', 'email']))
})

//login
router.post('/login', async (req, res) => {
    const { error } = validateUser(req.body);
    if(!error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.send(400).send('invalid email or password')

    const validPass = await bcrypt.compare(user.password, password)

    res.send(true)
})


//deleting a user
router.delete(':/id', async (req, res) => {

})




