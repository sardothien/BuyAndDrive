import Joi from 'joi';
import { JoiEmail, JoiName, JoiPassword } from '../../../types';

export interface SignUpBodyType {
  email:string;
  firstName: string;
  lastName: string;
  password: string;
}

export const SignUpBodySchema = Joi.object({
  email: JoiEmail,
  firstName: JoiName,
  lastName: JoiName,
  password: JoiPassword,
});
