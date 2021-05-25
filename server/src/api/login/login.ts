import { ApiResponse, InternalServerErrorResponse, InvalidReqStructureResponse, sendResponse, Statuses } from '../ApiResponse';
import { Request, Response } from 'express';
import * as passwords from '../../auth/passwords';
import * as tokens from '../../auth/tokens';
import { validateReqType } from '../../types';
import { getUserById, getUserIdByEmail } from '../../db';
import { getPasswordByUserId } from '../../db/interfaces/passwordUser';
import { LogInBodyType, LogInBodySchema } from './types';


const InvalidLoginResponse: ApiResponse = {
  status: Statuses.badRequest,
  payload: { error: 'invalid login information' }
}

const UserNotVerifiedResponse: ApiResponse = {
  status: Statuses.forbidden,
  payload: { error: 'user is not verified' }
}

export const login = async(req: Request, res: Response): Promise<void> => {
  const reqBody: LogInBodyType = req.body;

  if (!validateReqType(reqBody, LogInBodySchema)) return sendResponse(res, InvalidReqStructureResponse);

  try {
    const userId = await getUserIdByEmail(reqBody.email);

    if (!userId) return sendResponse(res, InvalidLoginResponse);
    
    const user = await getUserById(userId);
    
    if(!user?.verified) return sendResponse(res, UserNotVerifiedResponse);

    const pass = await getPasswordByUserId(userId);

    if (!pass) return sendResponse(res, InvalidLoginResponse);
  
    if (!await passwords.validatePassword(reqBody.password, pass)) return sendResponse(res, InvalidLoginResponse);
    
    res.status(Statuses.ok).send({ token: tokens.generateAccessToken(userId), user: userId, isAdmin: user.isAdmin,firstName:user.firstName,lastName:user.lastName });
  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};
