// Iterations Route

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ObjectId = require("mongodb").ObjectId;
var { iterationModel } = require("../models/Iteration");
var { projectModel } = require("../models/Project");
var { organizationModel } = require("../models/Organization");
var { studentModel, partnerModel } = require("../models/User");

// POST

router.route("/").post(async (req, res) => {
  try {
    const Iteration = req.body;
    return await addIterationToDatabase(Iteration, req, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.route("/:id/projects/:project_id").post(async (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    const project_id = ObjectId(req.params.project_id);
    return await addProjectToIterationAndOrganization(id, project_id, req, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// PUT

router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const Iteration = req.body;
    return await updateIterationInDatabase(id, Iteration, req, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// DELETE

router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    return await deleteIterationFromDatabase(id, req, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// GET

router.route("/:id").get(async (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    return await getIterationFromDatabase(id, req, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.route("/:iteration_id/matching").post(async (req, res) => {
  try {
    const iteration_id = ObjectId(req.params.iteration_id);
    return await getMatchingProjects(iteration_id, req, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

function addIterationToDatabase(iteration, req, res) {
  return iterationModel
    .create(iteration)
    .then((iteration) => {
      return res.status(201).json(iteration);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
}

function updateIterationInDatabase(id, iteration, req, res) {
  return iterationModel
    .findByIdAndUpdate(id, Iteration, { new: true })
    .then((iteration) => {
      return res.status(200).json(iteration);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
}

function deleteIterationFromDatabase(id, req, res) {
  return iterationModel
    .findByIdAndDelete(id)
    .then((iteration) => {
      return res.status(200).json(iteration);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
}

function getIterationFromDatabase(id, req, res) {
  return iterationModel
    .findById(id)
    .then((iteration) => {
      return res.status(200).json(iteration);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
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
  let res1 = await iterationModel
    .findByIdAndUpdate(id, { $push: { projects: curProject } }, { new: true })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
  let curOrganization = await organizationModel.findById(
    curProject.organization
  );
  if (!curOrganization) {
    return res.status(404).send("Organization not found");
  }
  for (let i = 0; i < curOrganization.projects.length; i++) {
    if (curOrganization.projects[i].name.equals(curProject.name)) {
      return res.status(409).send("Project already exists in organization");
    }
  }
  let res2 = await organizationModel.findByIdAndUpdate(
    curProject.organization,
    { $push: { projects: curProject } },
    { new: true }
  );
  if (res1 && res2) {
    return res.status(200).send("Project added to iteration and organization");
  }
}

function getMatchingProjects(iteration_id, req, res) {
  return iterationModel
    .findById(iteration_id)
    .then((iteration) => {
      //Get students and partners in iteration
      let teams = iteration.teams;
      let projects = iteration.projects;
      return projectMatching(teams, projects);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
}

function projectMatching(teams, projects) {
  let weightMatrix = []; // 2-Dimensional matrix (|teams| x |projects|)
  //Get Weights
  for (let i = 0; i < teams.length; i++) {
    //Note: getWeights is the utility function
    weightMatrix.push(getWeights(teams[i], projects));
  }
  return weightEvaluation(weightMatrix);
}

function getWeights(team, projects) {
  let teamVector = [];
  //Only compare partners with relevant project offerings - project interest is binary weight
  let relevantProjects = projects; //Relevant projects are the projects in the iteration
  for (let i = 0; i < relevantProjects.length; i++) {
    let matchingResult = categoryMatching(team, relevantProjects[i]);
    if (matchingResult > 0) {
      //Change this to category matching
      teamVector.push(matchingResult);
    } else {
      teamVector.push(-1);
    }
  }
  return teamVector;
}

function weightEvaluation(weightMatrix) {
  // Maximum bipartite matching
    // Find a maximum matching of a bipartite graph given an adjacecy matrix weight
    // The adjacecy matrix is a 2-Dimensional matrix (|teams| x |projects|)
    return bipartiteMatching(weightMatrix);
}

function bipartiteMatching(weightMatrix) {
  // Find a maximum matching of a bipartite graph given an adjacecy matrix weight
    // The adjacecy matrix is a 2-Dimensional matrix (|teams| x |projects|)
    let n = weightMatrix.length;
    let m = weightMatrix[0].length;
    let matching = [];
    for (let i = 0; i < m; i++) {
      matching.push(-1);
    }
    let assignedProjects = 0;
    for(let i = 0; i < n; i++) {
        let jobsSeen = new Array(m);
        for(let j = 0; j < m; j++) {
            jobsSeen[j] = false;
        }
        if(bpm(weightMatrix, i, jobsSeen, matching)) {
            assignedProjects++;
        }
    }
    return matching;
}

function bpm(weightMatrix, team, jobsSeen, matching) {
    for(let j = 0; j < weightMatrix[0].length; j++) {
        if(jobsSeen[j] == false && weightMatrix[team][j] > 0) {
            jobsSeen[j] = true;
            if(matching[j] < 0 || bpm(weightMatrix, matching[j], jobsSeen, matching)) {
                matching[j] = team;
                return true;
            }
        }
    }
    return false;
}

function categoryMatching(team, project) {
  //Compare student's category with project's category
  //Return number of matches between student and project matches

  let studentCategories = team.category;
  let projectCategories = project.category;
  let match = 0;
  for (let i = 0; i < studentCategories.length; i++) {
    for (let j = 0; j < projectCategories.length; j++) {
      if (studentCategories[i] == projectCategories[j]) {
        match++;
      }
    }
  }
  return match;
}

module.exports = router;
