import { InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { ResetPasswordReqSchema, ResetPasswordReqType } from './types'
import { getUserIdByEmail } from '../../db/interfaces';
import * as mailer from '../../mailer';
import { validateReqType } from "../../types";
import { Request, Response } from "express";

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  
  const reqBody: ResetPasswordReqType = req.body;

  if (!validateReqType(reqBody, ResetPasswordReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  try {
    const userId = await getUserIdByEmail(reqBody.email);
    
    if (!userId) {
      return sendResponse(res, InvalidReqContentResponse);
    }

    mailer.sendResetPasswordMail(reqBody.email, userId);

    res.status(Statuses.ok).send({ msg: 'password reset email sent' });
  } catch (err){
    console.log(err);
    return sendResponse(res, InternalServerErrorResponse);
  }
};
