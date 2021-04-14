import * as jwt from 'jsonwebtoken'
import { envVal } from '../envVal';

const generateToken = (userId: string, secretKey: string|undefined, expiration: string|undefined): string => {
  if(!secretKey) {
    throw new Error('No secret provided');
  }
  
  if(!expiration) {
    throw new Error('No expiration provided');
  }
  
  
  
  return jwt.sign(
    {
      userId
    },
    secretKey,
    {
      expiresIn: expiration + 'm',
    }
  );
}

export const generateAccessToken = (userId: string): string => {

  return generateToken(
    userId,
    envVal.jwtSecretKey,
    envVal.jwtExpirationInMins,
  );
}

export const generateSignUpToken = (userId: string): string => {

  return generateToken(
    userId,
    envVal.jwtSignUpSecretKey,
    envVal.jwtSignUpExpirationInMins,
  );
}
const verifyToken = (token: string | undefined, secretKey: string|undefined, expiration: string|undefined): string|undefined => {
  
  if(!token) {
    return undefined;
  }
  
  if(!secretKey) {
    throw new Error('No secret key provided');
  }
  
  if(!expiration) {
    throw new Error('No expiration provided');
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, secretKey) as Record<string, string>;
  } catch(err) {
    return undefined;
  }

  return decodedToken.userId;
}

export const verifyAccessToken = (token: string|undefined): string|undefined => {
  return verifyToken(
    token,
    envVal.jwtSecretKey,
    envVal.jwtExpirationInMins
  );
}

export const verifySignUpToken = (token: string|undefined): string|undefined => {
  return verifyToken(
    token,
    envVal.jwtSignUpSecretKey,
    envVal.jwtSignUpExpirationInMins
  );
}
