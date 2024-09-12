/**
 * ExpressError extends a normal JS error.
 * Adds a status whenever we create an instance of it.
 * 
 * The error-handling middleware will return this.
 */
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status;
    }
}

// 404 NotFound
class NotFoundError extends ExpressError {
    constructor(message = "Not found") {
        super(message, 404);
    }
}

// 401 UnAuth
class UnauthorizedError extends ExpressError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

// 400 BadRequest
class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

// 403 Forbidden
class ForbiddenError extends ExpressError {
    constructor(message = "Bad Request, Forbidden") {
        super(message, 403);
    }
}

module.exports = { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError };