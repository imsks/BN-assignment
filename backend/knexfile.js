const options = {
  client: "mysql",
  version: '6.0.1',
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "SACHINshukla@123",
    database: "bn_assignment",
  },
};

const knex = require("knex")(options);
module.exports = knex;
