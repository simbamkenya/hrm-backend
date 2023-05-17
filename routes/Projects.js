const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Project } = require('../models/Project');
const { validateProject } = require('../utils');


//list of projects
router.get('/', async (req, res) => {
    const projectsList = await Project.find();
    if(!projectsList) return res.status(400).send('projects couldnt be fetched') 
    
    res.send(projectsList)
});

//list of projects
router.get('/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);
    if(!project) return res.status(400).send('project with given id couldnt be fetched') 
    
    res.send(projectsList)
});


//posting a new project
router.post('/', async (req, res) => {
    const { error } = validateProject(req.body)
    if(!error) return res.status(400).send(error.details[0].message)
   
    let projects = new Project(req.body, _.pick(['dateDue', 'projectName', 'client', 'hours']));
    projects = await projects.save();
    
    res.send(projects)
});

//updating a project
router.put('/:id', async (req, res) => {
    const { error } = validateProject(req.body)
    if(!error) return res.status(400).send(error.details[0].message)

    let projects = await Project.findByIdAndUpdate(req.params.id, {
        dateDue: req.body.dateDue,
        projectName: req.body.projectName,
        client: req.body.client,
        hours: req.body.hours
    }, { new: true });
    
    res.send(projects)
});

//deleting a project
router.delete('/:id', async (req, res) => {
    const project = await Project.findByIdAndRemove(req.params.id);
    if(!project) return res.status(400).send('could not delete project with given id');

    res.send(project);
});


module.exports = router;