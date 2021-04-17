import Joi from 'joi';
import { JoiEmail } from '../../../types';

export interface ResetPasswordReqType {
  email: string;
}

export const ResetPasswordReqSchema = Joi.object({
  email: JoiEmail,
});
