import Joi from "joi";

export const JoiName = Joi.string().min(1).max(100).required();

export const JoiEmail = Joi.string().email().required();

export const JoiPassword = Joi.string().min(1).max(20).required();
