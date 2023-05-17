const Joi = require('joi')

 const validateEmployee = (employee) => {
   const schema=  Joi.object({
        email: Joi.string().email().required().min(2).max(20),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
    })

    return schema.validate(employee)
}

exports.validateEmployee = validateEmployee;