import Umzug from 'umzug';
import { sequelize, DatabaseMigration } from './db'
import { DataTypes } from 'sequelize';

export const umzug = new Umzug({
  // The storage.
  // Possible values: 'none', 'json', 'mongodb', 'sequelize', an argument for `require()`, including absolute paths
  storage: 'sequelize',

  // The options for the storage.
  // Check the available storages for further details.
  storageOptions: {
    // The configured instance of Sequelize.
    // Optional if `model` is passed.
    sequelize: sequelize,
  
    // The to be used Sequelize model.
    // Must have column name matching `columnName` option
    // Optional if `sequelize` is passed.
    // model: model,
  
    // The name of the to be used model.
    // Defaults to 'SequelizeMeta'
    modelName: 'SequelizeMeta',
  
    // The name of table to create if `model` option is not supplied
    // Defaults to `modelName`
    tableName: DatabaseMigration.getTableName(),
  
    // The name of table column holding migration name.
    // Defaults to 'name'.
    columnName: 'migration',
  
    // The type of the column holding migration name.
    // Defaults to `Sequelize.STRING`
    columnType: new DataTypes.STRING(100)
  },

  // The logging function.
  // A function that gets executed every time migrations start and have ended.
  logging: false,
  // logging: (log: string) => console.log(log),

  // The name of the positive method in migrations.
  upName: 'up',

  // The name of the negative method in migrations.
  downName: 'down',

  // (advanced) you can pass an array of migrations built with `migrationsList()` instead of the options below
  migrations: {
    // The params that gets passed to the migrations.
    // Might be an array or a synchronous function which returns an array.
    params: [sequelize.getQueryInterface()],

    // The path to the migrations directory.
    path: 'src/migrations',

    // The pattern that determines whether or not a file is a migration.
    pattern: /^\d+[\w-]+\.ts$/,

    // A function that receives and returns the to be executed function.
    // This can be used to modify the function.
    wrap: function (fun) { return fun; },
    
    // A function that maps a file path to a migration object in the form
    // { up: Function, down: Function }. The default for this is to require(...)
    // the file as javascript, but you can use this to transpile TypeScript,
    // read raw sql etc.
    // See https://github.com/sequelize/umzug/tree/master/test/fixtures
    // for examples.
    // customResolver: function (sqlPath)  {
    //      return { up: () => sequelize.query(fs.readFileSync(sqlPath, 'utf8')) }
    // }
    customResolver: undefined
  }
})