import { InternalServerErrorResponse, sendResponse, Statuses } from '../ApiResponse';
import { Request, Response } from 'express';
import { getNotApprovedCars } from '../../db/interfaces/car'

export const approveCars = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const cars = await getNotApprovedCars();

    res.status(Statuses.ok).send(cars);
    
  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};
