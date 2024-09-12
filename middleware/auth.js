// import jwt from "jsonwebtoken";
// import { SECRET_KEY } from "../config.js";
// import { UnauthorizedError } from "../helpers/expressError.js";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../helpers/expressError");

/**
 * Middleware: Authenticate user
 * 
 * If a token was provided, verify it. If valid, store the
 * token payload on res.locals which includes the username field.
 * 
 * Does not raise error if token is null or invalid.
 */
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    }
    catch (err) {
        return next();
    }
}

/**
 * Middleware: make sure user is logged in,
 * otherwise raises Unauthorized
 */
function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    }
    catch (err) {
        return next(err);
    }
}

/**
 * Middleware: ensure matching user with username provided,
 * otherwise raises Unauthorized.
 */
function ensureCorrectUser(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && user.username === req.params.username)) {
            throw new UnauthorizedError();
        }
        return next();
    }
    catch (err) {
        return next(err);
    }
}

module.exports = { authenticateJWT, ensureLoggedIn, ensureCorrectUser };