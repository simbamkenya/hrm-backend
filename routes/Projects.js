const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Project } = require('../models/Project');

//list of projects
router.get('/', async (req, res) => {
    const projectsList = await Project.find();
    if(!projectsList) return res.status(400).send('projects couldnt be fetched') 
    
    res.send(projectsList)
});


//posting a new project
router.post('/', async (req, res) => {
    let projects = new Project(req.body, _.pick(['dateDue', 'projectName', 'client', 'hours']));
    projects = await projects.save();
    
    res.send(projects)
});

//deleting a project
router.delete('/:id', async (req, res) => {
    const project = await Project.findByIdAndRemove(req.params.id);
    if(!project) return res.status(400).send('could not delete project with given id');

    res.send(project);
});


module.exports = router;