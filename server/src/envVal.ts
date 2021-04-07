import dotenv from 'dotenv';

dotenv.config();

export interface EnvValType {
  pgConnectionString: string;
}

const loadEnvVals = (): EnvValType => {
  if(
    !process.env.PGCONNECTION_STRING
    ) {
      throw new Error('Invalid .env file, some values are undefined, please check .env.example to see what you are missing');
  }

  return {
    pgConnectionString: process.env.PGCONNECTION_STRING,
  };
}

export const envVal: EnvValType = loadEnvVals();
