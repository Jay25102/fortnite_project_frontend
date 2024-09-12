const express = require("express");
const { BadRequestError } = require("../helpers/expressError");
const User = require("../models/user");
const jsonschema = require("jsonschema");
const { ensureCorrectUser } = require("../middleware/auth");
const { createToken } = require("../helpers/tokens");
const newUserShema = require("../schemas/newUser.json");

const router = express.Router();

router.get("/:username", async function(req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;