import Joi from "joi";

export const userSchema = Joi.object({
    email:Joi.string().email().required(),
    username:Joi.string().optional(),
    password:Joi.string().min(4).max(16).required()
})