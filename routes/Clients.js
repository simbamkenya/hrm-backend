 const express = require('express');
 const router = express.Router();
 const _ = require('lodash')
 const { Client } = require('../models/Client');
 

 router.get('/', async (req, res) => {
    const clientList = await Client.find();
    if (!clientList) return res.status(400).send('clients couldnt be fetched');

    res.send(clientList);
 });

 router.post('/', async (req, res) => {
    let clients = new Client(req.body, _.pick(['clientName', 'hourlyRate', 'email', 'address' ]));
    clients = await clients.save();
    res.send(clients)
    
 });

 router.delete('/:id', async (req, res) => {

 });


 module.exports = router;