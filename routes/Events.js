const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Event } = require('../models/Event');
const { validateEvent} = require('../utils');


//fetch a list of events
router.get('/', async (req, res) => {
    const eventList = await Event.find();
    if(!eventList) res.status(400).send('events  couldnt be fetched')

    res.send(eventList);
});

//fetch a single event
router.get('/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    if(!event) res.status(400).send('events  couldnt be fetched')

    res.send(event);
});



//posting an event
router.post('/', async (req, res) => {
    const { error } = validateClient(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let event = new Event(req.body, _.pick(['duration', 'eventName', 'eventDate', 'location', 'eventTime']))
    
    if(!event) return res.status(400).send('The event could not be posted');
    event = await event.save();

    res.send(event);
});

//update an event
router.put('/:id', async (req, res) => {
    const { error } = validateEvent(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let event = await Event.findByIdAndUpdate(req.params.id, {
      duration: req.body.duration, 
      eventName: req.body.eventName,
      eventDate: req.body.eventDate, 
      location: req.body.location,
      eventTime: req.body.eventTime
    }, { new: true})
    
    if(!event) return res.status(400).send('The event could not be updated');

    res.send(event);
});


//deleting an event
router.delete('/:id', async (req, res) => {
    const event = await Event.findOneAndRemove(req.params.id);
    if(!event) res.status(400).send('could not delete the given event');

    res.send(event);
});


module.exports = router;