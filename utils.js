const Joi = require('joi')

 const validateEmployee = (employee) => {
   const schema=  Joi.object({
        email: Joi.string().email().required().min(2).max(20),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
    })

    return schema.validate(employee)
}

const validateEvent = (event) => {
    const schema = Joi.object({
        duration: Joi.string().required(),
        eventName : Joi.string().max(40).required(),
        location: Joi.string().max(40).min(2).required(), 
        eventDate: Joi.date().required(),
        eventTime: Joi.string().max(20).required()
    })

    return schema.validate(event)
}
const validateClient = (client) => {
    const schema = Joi.object({
        clientName: Joi.string().required().min(2).max(30),
        email: Joi.string().required().email().min(2).max(30),
        address: Joi.string().required().min(2).max(50),
        hourlyRate: Joi.number().required().min(0).max(200)
    })
    return schema.validate(client)
}
const validateProject = (project) => {
    const schema = Joi.object({
        projectName: Joi.string().required().min(2).max(30),
        client: Joi.objectId().required(),
        hours: Joi.number().required().min(0).max(200),
        dateDue : Joi.string().required().min(2).max(30)
    })

    return schema.validate(project)
}
exports.validateEmployee = validateEmployee;
exports.validateClient = validateClient;
exports.validateEvent = validateEvent;
exports.validateProject = validateProject;