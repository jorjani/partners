// Organizations Route

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ObjectId = require("mongodb").ObjectId;
var { organizationModel } = require("../models/Organization");

// POST

router.route("/").post(async (req, res) => {
    try {
        const organization = req.body;
        return await addOrganizationToDatabase(organization, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);

// PUT

router.route("/:id").put(async (req, res) => {
    try {
        const id = req.params.id;
        const organization = req.body;
        return await updateOrganizationInDatabase(id, organization, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);

// DELETE

router.route("/:id").delete(async (req, res) => {
    try {
        const id = req.params.id;
        return await deleteOrganizationFromDatabase(id, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);


// GET

router.route("/:id").get(async (req, res) => {
    try {
        const id = ObjectId(req.params.id);
        return await getOrganizationFromDatabase(id, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);


function addOrganizationToDatabase(organization, req, res) {
    return organizationModel.create(organization)
        .then(organization => {
            return res.status(201).json(organization);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function updateOrganizationInDatabase(id, organization, req, res) {
    return organizationModel.findByIdAndUpdate(id, organization, { new: true })
        .then(organization => {
            return res.status(200).json(organization);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function deleteOrganizationFromDatabase(id, req, res) {
    return organizationModel.findByIdAndDelete(id)
        .then(organization => {
            return res.status(200).json(organization);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function getOrganizationFromDatabase(id, req, res) {
    return organizationModel.findById(id)
        .then(organization => {
            return res.status(200).json(organization);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


module.exports = router;