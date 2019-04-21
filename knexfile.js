// Update with your config settings.

module.exports = {

   development: {
      client: 'mysql2',
      connection: {
         host: 'localhost',
         user: 'root',
         password: 'mathematics',
         database: 'dcms',
      }
   },

   staging: {
      client: 'postgresql',
      connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
      },
      pool: {
      min: 2,
      max: 10
      },
      migrations: {
      tableName: 'knex_migrations'
      }
   },

   production: {
      client: 'mysql2',
      connection: {
         host: process.env.DB_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASS,
         database: process.env.DB_NAME,
      },
         pool: {
         min: 2,
         max: 10
      },
      migrations: {
         tableName: 'knex_migrations'
      }
   }

};
