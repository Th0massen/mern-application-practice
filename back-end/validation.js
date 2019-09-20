const Joi = require('@hapi/joi');

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate({
        username: data.username,
        password: data.password
    })
} 

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate({ 
        username: data.username,
        email: data.email,
        password: data.password
    });
}

module.exports.validateLogin = loginValidation;
module.exports.validateRegister = registerValidation;