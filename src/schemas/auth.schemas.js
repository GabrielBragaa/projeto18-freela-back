import Joi from "joi";

export const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    cpf: Joi.string().min(14).max(14).required(),
    telephone: Joi.string().min(14).max(14).required()
})