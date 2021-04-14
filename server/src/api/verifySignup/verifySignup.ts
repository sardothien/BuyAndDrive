import { InternalServerErrorResponse, InvalidReqContentResponse, InvalidReqStructureResponse, sendResponse, Statuses } from "../ApiResponse";
import { updateUserStatusToVerified } from "./db";
import * as tokens from '../../auth/tokens';
import { getUserById } from '../../db/interfaces';
import { Request, Response } from "express";
import { VerifySignUpdReqSchema, VerifySignUpReqType } from "./types";
import { validateReqType } from "../../types";

export const verifySignUp = async(req: Request, res: Response): Promise<void> => {
  
  const reqBody: VerifySignUpReqType = req.body;

  if (!validateReqType(reqBody, VerifySignUpdReqSchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  try {
    const userId = tokens.verifySignUpToken(reqBody.token);

    if (!userId) {
      return sendResponse(res, InvalidReqContentResponse);
    }

    if(!await getUserById(userId)) {
      return sendResponse(res, InvalidReqContentResponse);
    }

    await updateUserStatusToVerified(userId);

    res.status(Statuses.ok).send({ msg: 'user verified' });
  } catch(err) {
    console.log(err);
    return sendResponse(res, InternalServerErrorResponse);
  }
};
