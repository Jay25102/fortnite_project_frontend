const db = require("../db");
const bcrypt = require("bcrypt");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../helpers/expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

// functions related to user model
class User {

    /**
     * Verifies that user with username has the correct password.
     * Throws UnauthorizedError otherwise.
     * 
     * Returns { username, email }
     */
    static async authenticate(username, password) {
        const result = await db.query(`
            SELECT username,
            password,
            email 
            FROM users
            WHERE username = $1
        `, [username]);

        const user = result.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /**
     * if username doesn't already exist, register new user.
     * Otherwise, throw BadRequestError.
     * 
     * returns { username, email }
     */
    static async Register({ username, password, email }) {
        const duplicateCheck = await db.query(`
            SELECT username
            FROM users
            WHERE username = $1
        `, [username]);
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError("Username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(`
            INSERT INTO users
            (username, password, email)
            VALUES ($1, $2, $3)
            RETURNING username, email
        `, [username, hashedPassword, email]);
        const user = result.rows[0];

        return user;
    }

    /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

    static async get(username) {
        const userRes = await db.query(`
            SELECT username,
            email
            FROM users
            WHERE username = $1
        `, [username]);

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No such user: ${username}`);

        return user;
    }
}

module.exports = User;
