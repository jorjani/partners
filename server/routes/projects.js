// Projects Route

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ObjectId = require("mongodb").ObjectId;
var { projectModel } = require("../models/Project");

// POST

router.route("/").post(async (req, res) => {
    try {
        const project = req.body;
        return await addProjectToDatabase(project, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);

// PUT

router.route("/:id").put(async (req, res) => {
    try {
        const id = req.params.id;
        const project = req.body;
        return await updateProjectInDatabase(id, project, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);

// DELETE

router.route("/:id").delete(async (req, res) => {
    try {
        const id = req.params.id;
        return await deleteProjectFromDatabase(id, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);


// GET

router.route("/:id").get(async (req, res) => {
    try {
        const id = ObjectId(req.params.id);
        return await getProjectFromDatabase(id, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);


function addProjectToDatabase(project, req, res) {
    return projectModel.create(project)
        .then(project => {
            return res.status(201).json(project);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function updateProjectInDatabase(id, project, req, res) {
    return projectModel.findByIdAndUpdate(id, project, { new: true })
        .then(project => {
            return res.status(200).json(project);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function deleteProjectFromDatabase(id, req, res) {
    return projectModel.findByIdAndDelete(id)
        .then(project => {
            return res.status(200).json(project);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function getProjectFromDatabase(id, req, res) {
    return projectModel.findById(id)
        .then(project => {
            return res.status(200).json(project);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


module.exports = router;