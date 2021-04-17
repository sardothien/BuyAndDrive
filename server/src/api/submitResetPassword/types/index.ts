import Joi from 'joi';
import { JoiPassword } from '../../../types';

export interface SubmitResetPasswordReqType {
  token: string;
  password: string;
  repeatPassword: string;
}

export const SubmitResetPasswordReqSchema = Joi.object({
  token: Joi.string(),
  password: JoiPassword,
  repeatPassword: JoiPassword
});
