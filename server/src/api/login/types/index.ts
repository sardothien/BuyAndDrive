import Joi from 'joi';
import { JoiEmail, JoiPassword } from '../../../types';

export interface LogInBodyType {
  email:string;
  password: string;
}

export const LogInBodySchema = Joi.object({
  email: JoiEmail,
  password: JoiPassword,
});
