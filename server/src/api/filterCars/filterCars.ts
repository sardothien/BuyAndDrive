import { ApiResponse, InternalServerErrorResponse, InvalidReqStructureResponse, sendResponse, Statuses } from '../ApiResponse';
import { Request, Response } from 'express';
import { validateReqType } from '../../types';
const InvalidFilterResponse: ApiResponse = {
  status: Statuses.badRequest,
  payload: { error: 'invalid filter cars information' }
}

export const filterCars = async(req: Request, res: Response): Promise<void> => {
  try {
    res.status(Statuses.ok).send({});
  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};
