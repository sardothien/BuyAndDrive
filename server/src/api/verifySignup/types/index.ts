import Joi from "joi";

export interface VerifySignUpReqType {
  token: string;
}

export const VerifySignUpdReqSchema = Joi.object({
  token: Joi.string()
});
