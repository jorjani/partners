// Users Route

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ObjectId = require("mongodb").ObjectId;
var { studentModel, partnerModel, managementModel } = require("../models/User");

// POST

router.route("/:type").post(async (req, res) => {
    try {
        const user = req.body;
        const type = req.params.type;
        return await addUserToDatabase(type, user, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

// PUT

router.route("/:type/:id").put(async (req, res) => {
    try {
        const id = req.params.id;
        const type = req.params.type;
        const user = req.body;
        return await updateUserInDatabase(type, id, user, req, res);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})

// DELETE

router.route("/:type/:id").delete(async (req, res) => {
    try {
        const id = req.params.id;
        const type = req.params.type;
        return await deleteUserFromDatabase(type, id, req, res);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})

// GET

router.route("/:type/:id").get(async (req, res) => {
    try {
        const id = ObjectId(req.params.id);
        const type = req.params.type;
        return getUserFromDatabase(type, id, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

function addUserToDatabase(type, user, req, res) {
    if (type === "student") {
        const newStudent = new studentModel(user);
        newStudent.save((err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
    else if (type === "partner") {
        const newPartner = new partnerModel(user);
        newPartner.save((err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
    else if (type === "management") {
        const newManagement = new managementModel(user);
        newManagement.save((err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }

}

function getUserFromDatabase(type, id, req, res) {
    if (type === "student") {
        studentModel.findOne({ _id: id }, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
    else if (type === "partner") {
        partnerModel.findOne({ _id: id }, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
    else if (type === "management") {
        managementModel.findOne({ _id: id }, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
}

async function updateUserInDatabase(type, id, user, req, res) {
    if (type === "student") {
        let curUser = await studentModel.findOne({ _id: id });
        if (!curUser) {
            return res.status(404).send("User not found");
        }
        for (let property in user) {
            curUser[property] = user[property];
        }
        studentModel.findOneAndUpdate({ _id: id }, curUser, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
    else if (type === "partner") {
        let curUser = await partnerModel.findOne({ _id: id });
        if (!curUser) {
            return res.status(404).send("User not found");
        }
        for (let property in user) {
            curUser[property] = user[property];
        }
        partnerModel.findOneAndUpdate({ _id: id }, curUser, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
    else if (type === "management") {
        let curUser = await managementModel.findOne({ _id: id });
        if (!curUser) {
            return res.status(404).send("User not found");
        }
        for (let property in user) {
            curUser[property] = user[property];
        }
        managementModel.findOneAndUpdate({ _id: id }, curUser, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
}

function deleteUserFromDatabase(type, id, req, res) {
    if (type === "student") {
        studentModel.findOneAndDelete({ _id: id }, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
    else if (type === "partner") {
        partnerModel.findOneAndDelete({ _id: id }, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
    else if (type === "management") {
        managementModel.findOneAndDelete({ _id: id }, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                return res.status(201).send(result);
            }
        });
    }
}

module.exports = router;