const { Client } = require("pg");

const client = new Client(process.env.DB_URL);

module.exports = client;
