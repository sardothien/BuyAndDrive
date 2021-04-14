import dotenv from 'dotenv';

dotenv.config();

export interface EnvValType {
  pgConnectionString: string;
  gmailUser: string,
  gmailPass: string,
  jwtSecretKey: string;
  jwtExpirationInMins: string;
  jwtSignUpSecretKey: string;
  jwtSignUpExpirationInMins: string;
}

const loadEnvVals = (): EnvValType => {
  if(
    !process.env.PGCONNECTION_STRING || 
    !process.env.GMAIL_USER || 
    !process.env.GMAIL_PASS ||
    !process.env.JWT_SECRET_KEY || 
    !process.env.JWT_EXPIRATION_IN_MINS || 
    !process.env.JWT_SIGNUP_SECRET_KEY ||
    !process.env.JWT_SIGNUP_EXPIRATION_IN_MINS
    ) {
      throw new Error('Invalid .env file, some values are undefined, please check .env.example to see what you are missing');
  }

  return {
    pgConnectionString: process.env.PGCONNECTION_STRING,
    
    gmailUser: process.env.GMAIL_USER,
    gmailPass: process.env.GMAIL_PASS,
    
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpirationInMins: process.env.JWT_EXPIRATION_IN_MINS,
    
    jwtSignUpSecretKey: process.env.JWT_SIGNUP_SECRET_KEY,
    jwtSignUpExpirationInMins: process.env.JWT_SIGNUP_EXPIRATION_IN_MINS,
  };
}

export const envVal: EnvValType = loadEnvVals();
