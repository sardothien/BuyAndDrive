import { NextFunction, Request, Response } from 'express';
import * as tokens from '../auth/tokens';
import { Statuses } from '../api/ApiResponse';
import * as db from '../db';
import { compareSync } from 'bcrypt';

const endpointsWithNoAuth: Record<string, Array<string>> = {
  '/login': ['POST',],
  '/signup': ['POST',],
  '/verify_signup': ['POST',],
  '/oauth/google': ['POST',],
  '/reset_password': ['POST',],
  '/verify_reset_password': ['POST',],
  '/submit_reset_password': ['POST',],
  '/filter_cars': ['GET',],
}

const endpointsWithAuth: Record<string, Array<string>> = {
  '/new_car': ['POST',],
  '/add_favourite': ['POST',],
  '/remove_favourite': ['DELETE',],
  '/users_cars': ['GET',],
  '/favourites': ['GET',],
  '/buy_car': ['PATCH',]
}

const adminEndpoints: Record<string, Array<string>> = {
  '/approve_cars': ['GET', 'PATCH'],
  '/reject_cars': ['DELETE',],
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
      if (methodIsAllowed(adminEndpoints, endpoint, req.method) || methodIsAllowed(endpointsWithAuth, endpoint, req.method)) {
        res.locals.userId = userId;
        next();
        return;
      }
    } 
    if (methodIsAllowed(endpointsWithAuth, endpoint, req.method)) {
      res.locals.userId = userId;
      next();
      return;
    } 
    res.status(Statuses.notAllowed).send('Method not allowed');
    return;
  }
  res.status(Statuses.unauthorized).send('Invalid token.');
  return;
};

const methodIsAllowed = (allEndpoints: Record<string, Array<string>>, specificEndpoint: string, method: string): boolean => {
  const trimmedEndpoint = '/' + specificEndpoint.split('/')[1];
  try {
    return allEndpoints[trimmedEndpoint].includes(method);
  } catch {
    return false
  }
}

const isValidEndpoint = (endpoint: string): boolean => {
  return (
    endpointIsSubstringOfTargetEndpoint(endpoint, Object.keys(endpointsWithNoAuth)) ||
    endpointIsSubstringOfTargetEndpoint(endpoint, Object.keys(endpointsWithAuth)) ||
    endpointIsSubstringOfTargetEndpoint(endpoint, Object.keys(adminEndpoints))
  )
}

const endpointIsSubstringOfTargetEndpoint = (endpoint: string, knownEndpoints: Array<string>):boolean => {  
  let check = false;
  knownEndpoints.forEach(e => { 
    if(endpoint.includes(e)) {
      check = true;
      return;
    }
  })
  return check;
}
