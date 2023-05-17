const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Event } = require('../models/Event');

//fetch a list of events
router.get('/', async (req, res) => {
    const eventList = await Event.find();
    if(!eventList) res.status(400).send('events  couldnt be fetched')

    res.send(eventList);
});


//posting an event
router.post('/', async (req, res) => {
    let event = new Event(req.body, _.pick(['duration', 'eventName', 'eventDate', 'location', 'eventTime']))
    
    if(!event) return res.status(400).send('The event could not be posted');
    event = await event.save();

    res.send(event);
});


//deleting an event
router.delete('/:id', async (req, res) => {
    const event = await Event.findOneAndRemove(req.params.id);
    if(!event) res.status(400).send('could not delete the given event');

    res.send(event);
});


module.exports = router;