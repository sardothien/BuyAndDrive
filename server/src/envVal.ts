import dotenv from 'dotenv';
import { string } from 'joi';

dotenv.config();

export interface EnvValType {
  pgConnectionString: string;
  mailjetApiKey: string,
  mailjetSecretKey: string,
  mailjetEmail: string,
}

const loadEnvVals = (): EnvValType => {
  if(
    !process.env.PGCONNECTION_STRING || 
    !process.env.MAILJET_API_KEY || 
    !process.env.MAILJET_SECRET_KEY || 
    !process.env.MAILJET_EMAIL
    ) {
      throw new Error('Invalid .env file, some values are undefined, please check .env.example to see what you are missing');
  }

  return {
    pgConnectionString: process.env.PGCONNECTION_STRING,
    mailjetApiKey: process.env.MAILJET_API_KEY,
    mailjetSecretKey: process.env.MAILJET_SECRET_KEY,
    mailjetEmail: process.env.MAILJET_EMAIL
  };
}

export const envVal: EnvValType = loadEnvVals();
