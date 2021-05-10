import { NextFunction, Request, Response } from 'express';
import * as tokens from '../auth/tokens';
import { Statuses } from '../api/ApiResponse';
import * as db from '../db';

const endpointsWithNoAuth: Record<string, Array<string>> = {
  '/login': ['POST',],
  '/signup': ['POST',],
  '/verify_signup': ['POST',],
  '/oauth/google': ['POST',],
  '/reset_password': ['POST',],
  '/verify_reset_password': ['POST',],
  '/submit_reset_password': ['POST',],
}

const endpointsWithAuth: Record<string, Array<string>> = {
  '/new': ['POST',],
  '/add_favourite': ['POST',],
  '/remove_favourite': ['DELETE',],
  '/filter_cars': ['GET',],
}

const adminEndpoints: Record<string, Array<string>> = {
  '/approve_cars': ['GET'],
  '/reject_cars': ['POST',],
}

export const tokenChecker = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const endpoint = req.path;
  
  if (!isValidEndpoint(endpoint)) {
    res.status(Statuses.notFound).send('Invalid path');
    return; 
  }

  if (endpoint in endpointsWithNoAuth) {

    if (methodIsAllowed(endpointsWithNoAuth, endpoint, req.method)) {
      next();
      return;
    } else {
      res.status(Statuses.notAllowed).send('Method not allowed');
      return;
    }
  }

  const token = req.headers['authorization'];
  const userId = tokens.verifyAccessToken(token as string);

  if (userId) {
    const user = await db.getUserById(userId);
    if (user?.isAdmin) {
      if (methodIsAllowed(adminEndpoints, endpoint, req.method)) {
        next();
        return;
      }
    } else {
      res.status(Statuses.notAllowed).send('Method not allowed');
      return;
    }

    res.locals.userId = userId;
    next();
    return;
  }
  res.status(Statuses.unauthorized).send('Invalid token.');
  return;
};

const methodIsAllowed = (allEndpoints: Record<string, Array<string>>, specificEndpoint: string, method: string): boolean => {
  return allEndpoints[specificEndpoint].includes(method);
}

const isValidEndpoint = (endpoint: string): boolean => {
  return (
    endpoint in endpointsWithNoAuth ||
    endpoint in endpointsWithAuth || 
    endpoint in adminEndpoints
  )
}