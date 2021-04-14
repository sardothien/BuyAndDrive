import { Request, Response } from 'express';
import { sendResponse, InternalServerErrorResponse, InvalidReqStructureResponse, Statuses } from "../ApiResponse";
import { insertUser } from "./db";
import { SignUpBodyType, SignUpBodySchema } from "./types";
import * as passwords from '../../auth/passwords';
import { validateReqType } from "../../types";
import { getUserIdByEmail } from "../../db";
import { sendSignUpSuccessfulMail } from '../../mailer';

export const signup = async (req: Request, res: Response): Promise<void> => {

  const reqBody: SignUpBodyType = req.body;

  if (!validateReqType(reqBody, SignUpBodySchema)) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  try {
    if (await getUserIdByEmail(reqBody.email)) {
      res.status(Statuses.badRequest).send({ error: 'email taken' });
      return;
    }

    const passwordHash = await passwords.generateHash(reqBody.password);
    
    const user = await insertUser(
      reqBody.email,
      reqBody.firstName,
      reqBody.lastName,
      passwordHash
    );

    sendSignUpSuccessfulMail(reqBody.email, user.id as string);
      
    res.status(Statuses.ok).send({ msg: 'user signed up' });
  } catch(err) {
    console.log(err.message);
    return sendResponse(res, InternalServerErrorResponse);
  }
};
