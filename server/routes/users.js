// Users Route

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ObjectId = require("mongodb").ObjectId;
var { userModel } = require("../models/User");

// POST

// PUT

// DELETE

// GET

router.route("/:id").get(async (req, res) => {
    try {
        const id = ObjectId(req.params.id);
        var cursor = await userModel.findOne({ _id: id });
        if (cursor) {
            return res.status(200).json(cursor.toJSON());
        } else {
            return res.status(404).send("No users with this id exist");
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

module.exports = router;