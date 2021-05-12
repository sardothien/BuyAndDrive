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
  
  jwtPassResetSecretKey: string
  jwtPassResetExpirationInMins: string
  
  googleClientId: string
  
  frontendUrl: string
}

const loadEnvVals = (): EnvValType => {
  if(
    !process.env.PGCONNECTION_STRING || 
    !process.env.GMAIL_USER || 
    !process.env.GMAIL_PASS ||
    !process.env.JWT_SECRET_KEY || 
    !process.env.JWT_EXPIRATION_IN_MINS || 
    !process.env.JWT_SIGNUP_SECRET_KEY ||
    !process.env.JWT_SIGNUP_EXPIRATION_IN_MINS ||
    !process.env.JWT_PASS_RESET_SECRET_KEY ||
    !process.env.JWT_PASS_RESET_EXPIRATION_IN_MINS ||
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.FRONTEND_URL
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
    
    jwtPassResetSecretKey: process.env.JWT_PASS_RESET_SECRET_KEY,
    jwtPassResetExpirationInMins: process.env.JWT_PASS_RESET_EXPIRATION_IN_MINS,
    
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    
    frontendUrl: process.env.FRONTEND_URL,
  };
}

export const envVal: EnvValType = loadEnvVals();
