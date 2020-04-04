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
// Communicate to our database
export const sequelize = new Sequelize({
  database: 'chat',
  dialect: 'sqlite', // Change to mysql, postgres, mariadb, etc
  username: 'root',
  password: '',
  storage: 'chat.db', // could be ':memory:'
  models: [__dirname + '/models'], // __dirname : current directory
  logging: false
});
