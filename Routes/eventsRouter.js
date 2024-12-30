const express=require('express');
const fs=require('fs');
const eventsController=require('../Controllers/eventsController.js');
const Router=express.Router();
Router.post('/create',eventsController.create_events);
Router.post('/register/:id',eventsController.register_events);
Router.put('/update/:id',eventsController.updateBy_ID)
Router.get('/all',eventsController.getAllEvents)

Router.route('/:id')
    .delete(eventsController.delete_event)
    .get(eventsController.getEventBy_ID)

module.exports=Router;