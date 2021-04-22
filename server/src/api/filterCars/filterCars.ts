import { ApiResponse, InternalServerErrorResponse, InvalidReqStructureResponse, sendResponse, Statuses } from '../ApiResponse';
import { Request, Response } from 'express';
import { validateReqType } from '../../types';
import { getCarsIdByObject } from '../../db/interfaces/car'
import { FilterCarSchema } from './types'
import { generateQuery} from './queryGenerator'
const InvalidFilterResponse: ApiResponse = {
  status: Statuses.badRequest,
  payload: { error: 'invalid filter cars information' }
}

export const filterCars = async (req: Request, res: Response): Promise<void> => {
  if (!validateReqType(req.query,FilterCarSchema)) return sendResponse(res,InvalidFilterResponse)
  try {
    const filterObject = await generateQuery(req);
    const cars = await getCarsIdByObject(filterObject);
    res.status(Statuses.ok).send(cars);
  } catch(err) {
    return sendResponse(res, InternalServerErrorResponse);
  }
};
