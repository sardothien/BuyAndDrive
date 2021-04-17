import { InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import * as tokens from '../../auth/tokens';
import { getUserById } from '../../db/interfaces';
import { VerifyResetPasswordReqType, VerifyResetPasswordReqSchema } from './types';
import { validateReqType } from "../../types";
import { Request, Response } from "express";

export const verifyResetPassword = async(req: Request, res: Response): Promise<void> => {
  
  const reqBody: VerifyResetPasswordReqType = req.body;

  if (!validateReqType(reqBody, VerifyResetPasswordReqSchema)) return sendResponse(res, InvalidReqStructureResponse);

  const userId = tokens.verifyResetPasswordToken(reqBody.token as string);

  if (!userId) return sendResponse(res, InvalidReqContentResponse);

  if(!await getUserById(userId)) return sendResponse(res, InvalidReqContentResponse);

  res.status(Statuses.ok).send({ msg: 'password reset verified' });
};
