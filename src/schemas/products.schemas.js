import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    picture: Joi.string().uri(),
    price: Joi.string().required(),
    category: Joi.string().required()
})