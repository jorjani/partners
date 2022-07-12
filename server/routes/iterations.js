// Iterations Route

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ObjectId = require("mongodb").ObjectId;
var { iterationModel } = require("../models/Iteration");

// POST

router.route("/").post(async (req, res) => {
    try {
        const Iteration = req.body;
        return await addIterationToDatabase(Iteration, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);

// PUT

router.route("/:id").put(async (req, res) => {
    try {
        const id = req.params.id;
        const Iteration = req.body;
        return await updateIterationInDatabase(id, Iteration, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);

// DELETE

router.route("/:id").delete(async (req, res) => {
    try {
        const id = req.params.id;
        return await deleteIterationFromDatabase(id, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);


// GET

router.route("/:id").get(async (req, res) => {
    try {
        const id = ObjectId(req.params.id);
        return await getIterationFromDatabase(id, req, res);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
);


function addIterationToDatabase(Iteration, req, res) {
    return iterationModel.create(Iteration)
        .then(iteration => {
            return res.status(201).json(Iteration);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function updateIterationInDatabase(id, Iteration, req, res) {
    return iterationModel.findByIdAndUpdate(id, Iteration, { new: true })
        .then(iteration => {
            return res.status(200).json(Iteration);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function deleteIterationFromDatabase(id, req, res) {
    return iterationModel.findByIdAndDelete(id)
        .then(iteration => {
            return res.status(200).json(Iteration);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function getIterationFromDatabase(id, req, res) {
    return iterationModel.findById(id)
        .then(iteration => {
            return res.status(200).json(Iteration);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


module.exports = router;