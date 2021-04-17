import { InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import * as tokens from '../../auth/tokens';
import { getUserById } from '../../db/interfaces';
import { SubmitResetPasswordReqSchema, SubmitResetPasswordReqType } from "./types";
import { validateReqType } from "../../types";
import { getPasswordByUserId } from "../../db/interfaces/passwordUser";
import { createPassword, updatePassword } from "./db";
import * as passwords from '../../auth/passwords';
import { Request, Response } from "express";

export const submitResetPassword = async(req: Request, res: Response): Promise<void> => {

  const reqBody: SubmitResetPasswordReqType = req.body;

  if (!validateReqType(reqBody, SubmitResetPasswordReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  const userId = tokens.verifyResetPasswordToken(reqBody.token as string);

  if (!userId) return sendResponse(res, InvalidReqContentResponse);

  try {
    if(!await getUserById(userId)) return sendResponse(res, InvalidReqContentResponse);

    if (reqBody.password !== reqBody.repeatPassword) {
      return sendResponse(res, InvalidReqContentResponse);
    }

    const pass = await getPasswordByUserId(userId);

    const passwordHash = await passwords.generateHash(reqBody.password);

    if (pass) await updatePassword(userId, passwordHash);
    else createPassword(userId, passwordHash);

    res.status(Statuses.ok).send({ msg: 'password reset successful' });
  } catch (err) {
    console.log(err);
    return sendResponse(res, InternalServerErrorResponse);
  }
}
