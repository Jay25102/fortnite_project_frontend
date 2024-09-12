// import express from "express";
// import cors from "cors";
// import { NotFoundError } from "./helpers/expressError.js";
// import { authenticateJWT } from "./middleware/auth.js";
// import authRouter from "./routes/auth.js";

const express = require("express");
const cors = require("cors");
const { NotFoundError } = require("./helpers/expressError");
const { authenticateJWT } = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/wishlist");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/items", itemRoutes);

// handling 404s
app.use(function(req, res, next) {
    return next(new NotFoundError());
});

// generic error handler
app.use(function(err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
    
    return res.status(status).json({
        error: { message, status }
    });
});

module.exports = app;