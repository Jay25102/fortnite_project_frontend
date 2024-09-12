const express = require("express");
const { BadRequestError } = require("../helpers/expressError");
const User = require("../models/user");
const Wishlist = require("../models/wishlist");
const jsonschema = require("jsonschema");
const { ensureCorrectUser } = require("../middleware/auth");
const { createToken } = require("../helpers/tokens");
const newItemSchema = require("../schemas/newItem.json");

const router = express.Router();

router.post("/new", async function(req, res, next) {
    try {
        // console.log(req.body);
        const user = await User.get(req.body.username);
        if (user) {
            // console.log(req.body.itemInfo);
            const duplicate = await Wishlist.checkExists(req.body.username, req.body.itemInfo);
            if (!duplicate) {
                await Wishlist.addItem(req.body.username, req.body.itemInfo);
                return res.json({ success: true });
            }
            else {
                return res.json({ success: false })
            }
        }
        else {
            throw new BadRequestError("Please log in first!");
        }
    }
    catch (err) {
        return next(err);
    }
});

router.get("/:username", async function(req, res, next) {
    // req.params.username
    try {
        const user = await User.get(req.params.username);
        if (user) {
            const result = await Wishlist.getAllItems(req.params.username);
            return res.json({result});
        }
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;