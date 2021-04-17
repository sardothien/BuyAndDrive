import Joi from 'joi';

export interface VerifyResetPasswordReqType {
  token: string;
}

export const VerifyResetPasswordReqSchema = Joi.object({
  token: Joi.string()
});
