const Joi = require('joi');

function validateImageData(imageData){
    const JoiSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
    }).options({abortEarly: false});

    return JoiSchema.validate(imageData)
}

module.exports = validateImageData;