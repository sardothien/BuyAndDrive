import * as fs from 'fs';
import * as path from 'path';

const template = `
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (query: QueryInterface): Promise<void> => {
    // your up code goes here
  },
  down: async (query: QueryInterface): Promise<void> => {
    // your down code goes here
  },
};
`
const currentTime = new Date();

const month = currentTime.getMonth() + 1 < 10 ? `0${currentTime.getMonth() + 1}` : `${currentTime.getMonth() + 1}`;
const hour = currentTime.getHours() < 10 ? `0${currentTime.getHours()}` : `${currentTime.getHours()}`;
const day = currentTime.getDate() < 10 ? `0${currentTime.getDate()}` : `${currentTime.getDate()}`;
const minute = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : `${currentTime.getMinutes()}`;

const timestamp = `${currentTime.getFullYear()}${month}${hour}${day}${minute}-migration-skeleton.ts`;
const fpath = path.resolve(__dirname, '../') + '/migrations/' + timestamp;


fs.writeFileSync(fpath, template);
console.log('migration-skeleton created, make sure to rename it after ASAP!');