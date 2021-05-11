import { Request, Response } from 'express';
import { sendResponse, InternalServerErrorResponse, Statuses, InvalidReqStructureResponse } from "../ApiResponse";
import { getCarsByUserId } from '../../db';
import * as tokens from '../../auth/tokens';

export const getUsersCars = async (req: Request, res: Response): Promise<void> => {

  const token = req.headers['authorization'];
  const userId = tokens.verifyAccessToken(token as string);

  if (!userId) {
    return sendResponse(res, InvalidReqStructureResponse);
  }

  try {
    
    const cars = await getCarsByUserId(userId);
    
    res.status(Statuses.ok).send(cars);
    
  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};