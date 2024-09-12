const db = require("../db");
const bcrypt = require("bcrypt");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../helpers/expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

// functions related to the Wishlist model
class Wishlist {

    /**
     * Verifies if the item under the username already exists.
     * 
     * Returns { username, item }
     */
    static async checkExists(username, item) {
        const result = await db.query(`
            SELECT username, item
            FROM wishlist
            WHERE username = $1 AND item = $2
        `, [username, JSON.stringify(item)]);

        return result.rows[0];
    }

    /**
     * Adds an item to the wishlist table
     * 
     * returns {username, item}
     */
    static async addItem(username, item) {
        const result = await db.query(`
            INSERT INTO wishlist
            (username, item)
            VALUES ($1, $2)
            RETURNING username, item
        `, [username, JSON.stringify(item)]);

        return result.rows[0];
    }

    /**
     * Retrieves all items under a certain username.
     * 
     * returns an all item objects
     */
    static async getAllItems(username) {
        const result = await db.query(`
            SELECT item
            FROM wishlist
            WHERE username = $1    
        `, [username]);

        return result.rows;
    }
}

module.exports = Wishlist;