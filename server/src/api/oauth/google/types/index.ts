import Joi from 'joi';

export interface GoogleOAuthReqType {
  idToken: string;
}

export const GoogleOAuthReqSchema = Joi.object({
  idToken: Joi.string().required()
});
