 const express = require('express');
 const router = express.Router();
 const _ = require('lodash')
 const { Client } = require('../models/Client');
const { validateClient } = require('../utils');
 

//fectch all clients
 router.get('/', async (req, res) => {
    const clientList = await Client.find();
    if (!clientList) return res.status(400).send('clients couldnt be fetched');

    res.send(clientList);
 });

 router.post('/', async (req, res) => {
    const { error } = validateClient(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    
    let clients = new Client(req.body, _.pick(['clientName', 'hourlyRate', 'email', 'address' ]));
    clients = await clients.save();
    res.send(clients)
    
 });

 //update clients
 router.put('/:id', async (req, res) => {
    const { error } = validateClient(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let client = await Client.findByIdAndUpdate(req.params.id, {
      clientName: req.body.clientName,
      hourlyRate: req.body.hourlyRate,
      email: req.body.email, 
      address: req.body.address
    }, { new: true});

    res.send(client)
    
 });

 //delete a client
 router.delete('/:id', async (req, res) => {
   const client = await Client.findByIdAndRemove(req.params.id);
   if(!client) return res.status(200).send('the client with given id couldnt be deleted')

   res.send(client)
 });


 module.exports = router;