import { ApiResponse, Statuses } from '../ApiResponse';
import { Request, Response } from 'express';

const InvalidLoginResponse: ApiResponse = {
  status: Statuses.badRequest,
  payload: { error: 'invalid login information' }
}

export const login = async(req: Request, res: Response): Promise<void> => {
  res.status(Statuses.ok).send({data: 'dummy login'});
};
