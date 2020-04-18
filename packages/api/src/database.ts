// Another way to set model
// import { Sequelize } from 'sequelize-typescript';
// import { User } from './models/User';

// // Communicate to our database
// export const sequelize = new Sequelize({
//   database: 'chat',
//   dialect: 'sqlite', // Change to mysql, postgres, mariadb, etc
//   username: 'root',
//   password: '',
//   storage: 'chat.db', // could be ':memory:'
//   models: [User], // __dirname : current directory
//   logging: false
// });


import { Sequelize } from 'sequelize-typescript';

const dbOptions = {
  models: [__dirname + '/models'],
  logging: false
};

// Communicate to our database
// @ts-ignore
export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, dbOptions)
  : new Sequelize({
    ...dbOptions,
    database: 'chat',
    dialect: 'sqlite', // Change to mysql, postgres, mariadb, etc
    username: 'root',
    password: '',
    storage: 'chat.db'
  });
