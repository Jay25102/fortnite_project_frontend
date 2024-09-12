require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1: 12;

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL;
}

console.log("SECRET_KEY: ", SECRET_KEY);
console.log("PORT: ", PORT.toString());
console.log("BCRYPT_WORK_FACTOR: ", BCRYPT_WORK_FACTOR);
console.log("Database uri: ", getDatabaseUri());
console.log("------------");

module.exports = { SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, getDatabaseUri };

