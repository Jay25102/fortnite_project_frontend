// import pg from "pg";
// const { Pool } = pg;
// import { getDatabaseUri, PORT } from "./config.js";

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else {
    db = new Client({
        connectionString: getDatabaseUri()
    });
}

db.connect();

module.exports = db;