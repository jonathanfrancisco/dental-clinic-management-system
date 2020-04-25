// Update with your config settings.
const config = require('./config');

/*  
  originally this project was developed using mysql2 client
  had to use postgres temporarily since mysql is not installed 
  on my machine upon updating this as of April 26, 2020
*/
module.exports = {
  development: {
    client: 'postgres',
    connection: {
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      port: config.database.port,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
