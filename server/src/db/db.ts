import { Sequelize } from 'sequelize';
import { envVal } from '../envVal';
import * as m from './models';

export const sequelize: Sequelize = new Sequelize(envVal.pgConnectionString, {
  logging: true
});

// Database table models
export const DatabaseMigration = m.DatabaseMigrationC(sequelize);
export const User = m.UserC(sequelize);
export const PasswordUser = m.PasswordUserC(sequelize);
export const GoogleOauthUser = m.GoogleOauthUserC(sequelize);

PasswordUser.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(PasswordUser, { foreignKey: 'userId' });

GoogleOauthUser.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(GoogleOauthUser, { foreignKey: 'userId' });

export const testDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
}

export const dropAllTables = async (): Promise<void> => {
  await sequelize.drop();
  console.log("All tables dropped!");
}
