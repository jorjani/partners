// Iterations Route

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ObjectId = require("mongodb").ObjectId;
var { iterationModel } = require("../models/Iteration");
var { projectModel } = require("../models/Project");
var { organizationModel } = require("../models/Organization");

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

router.route("/:id/projects/:project_id").post(async (req, res) => {
    try {
        const id = ObjectId(req.params.id);
        const project_id = ObjectId(req.params.project_id);
        return await addProjectToIterationAndOrganization(id, project_id, req, res);
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


function addIterationToDatabase(iteration, req, res) {
    return iterationModel.create(iteration)
        .then(iteration => {
            return res.status(201).json(iteration);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function updateIterationInDatabase(id, iteration, req, res) {
    return iterationModel.findByIdAndUpdate(id, Iteration, { new: true })
        .then(iteration => {
            return res.status(200).json(iteration);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function deleteIterationFromDatabase(id, req, res) {
    return iterationModel.findByIdAndDelete(id)
        .then(iteration => {
            return res.status(200).json(iteration);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


function getIterationFromDatabase(id, req, res) {
    return iterationModel.findById(id)
        .then(iteration => {
            return res.status(200).json(iteration);
        }).catch(err => {
            return res.status(500).send(err.message);
        }
        );
}


async function addProjectToIterationAndOrganization(id, project, req, res) {
    let curProject = await projectModel.findById(project);
    if (!curProject) {
        return res.status(404).send("Project not found");
    }
    let curIteration = await iterationModel.findById(id);
    if (!curIteration) {
        return res.status(404).send("Iteration not found");
    }
    for (let i = 0; i < curIteration.projects.length; i++) {
        if (curIteration.projects[i].name.equals(project.name)) {
            return res.status(400).send("Project already exists in iteration");
        }
    }
    let res1 = await iterationModel.findByIdAndUpdate(id, { $push: { projects: curProject } }, { new: true })
        .catch(err => {
            return res.status(500).send(err.message);
        }
        );
    let curOrganization = await organizationModel.findById(curProject.organization);
    if (!curOrganization) {
        return res.status(404).send("Organization not found");
    }
    for (let i = 0; i < curOrganization.projects.length; i++) {
        if (curOrganization.projects[i].name.equals(curProject.name)) {
            return res.status(409).send("Project already exists in organization");
        }
    }
    let res2 = await organizationModel.findByIdAndUpdate(curProject.organization, { $push: { projects: curProject } }, { new: true });
    if (res1 && res2) {
        return res.status(200).send("Project added to iteration and organization");
    }
}

module.exports = router;