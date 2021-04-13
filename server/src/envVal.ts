import dotenv from 'dotenv';
import { string } from 'joi';

dotenv.config();

export interface EnvValType {
  pgConnectionString: string;
  gmailUser: string,
  gmailPass: string,
}

const loadEnvVals = (): EnvValType => {
  if(
    !process.env.PGCONNECTION_STRING || 
    !process.env.GMAIL_USER || 
    !process.env.GMAIL_PASS
    ) {
      throw new Error('Invalid .env file, some values are undefined, please check .env.example to see what you are missing');
  }

  return {
    pgConnectionString: process.env.PGCONNECTION_STRING,
    gmailUser: process.env.GMAIL_USER,
    gmailPass: process.env.GMAIL_PASS,
  };
}

export const envVal: EnvValType = loadEnvVals();
