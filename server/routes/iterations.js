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
    let iteration = req.body;
    return await addIterationToDatabase(iteration, req, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.route("/:id/groups/:group_id/join").post(async (req, res) => {
  try {
    let iterationId = req.params.id;
    let groupId = req.params.group_id;
    return await joinGroup(iterationId, groupId, req, res);
  }
  catch (err) {
    return res.status(500).send(err.message);
  }
});

router.route("/:id/groups/:group_id/leave").post(async (req, res) => {
  try {
    let iterationId = req.params.id;
    let groupId = req.params.group_id;
    return await leaveGroup(iterationId, groupId, req, res);
  }
  catch (err) {
    return res.status(500).send(err.message);
  }
});

router.route('/:id/user/:user_id/rank').post(async (req, res) => {
  try {
    let iterationId = req.params.id;
    let userId = req.params.user_id;
    let ranking = req.body.ranking;
    return await updateUserRanking(iterationId, userId, ranking, req, res);
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

router.route("/").get(async (req, res) => {
  try {
    return await getAllIterations(req, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    return await getIterationFromDatabase(id, req, res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.route("/:iteration_id/groups").get(async (req, res) => {
  try {
    const iteration_id = ObjectId(req.params.iteration_id);
    return await getTeamsFromIteration(iteration_id, req, res);
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

async function updateUserRanking(iterationId, userId, ranking, req, res) {
  console.log(ranking)
  return iterationModel
    .findById(iterationId)
    .then(async (iteration) => {
      // find user in iteration
      let curUser = await studentModel.findById(userId);
      let found = false;
      for (let i = 0; i < iteration.teams.length; i++) {
        for (let j = 0; j < iteration.teams[i].members.length; j++) {
          if (iteration.teams[i].members[j].email == curUser.email) {
            // update ranking even if ranking isn't a field in the user model
            if('ranking' in iteration.teams[i].members[j]) {
              iteration.teams[i].members[j].ranking = ranking;
            } else {
              iteration.teams[i].members[j] = {...iteration.teams[i].members[j], ranking};
            }
            found = true;
            console.log(iteration.teams[i].members[j])
            break
          }
        }
      }
      if(!found) {
        console.log("User not in any groups.");
      }
      iteration.save().then(() => {
        return res.status(200).send("User ranking updated.");
      }).catch((err) => {
        return res.status(500).send(err.message);
      });
    })
    .catch(err => {
      return res.status(500).send(err.message);
    }
    );
}

async function joinGroup(iterationId, groupId, req, res) {
  return iterationModel
    .findById(iterationId)
    .then(async (iteration) => {
      let curUser = new studentModel(req.body);
      let found = false;
      for (let i = 0; i < iteration.teams.length; i++) {
        for (let j = 0; j < iteration.teams[i].members.length; j++) {
          if (iteration.teams[i].members[j].email == curUser.email) {
            return res.status(400).send("User already in a group");
          }
        }
      }
      if (found) {
        return res.status(400).send("User already in a group");
      }
      iteration.teams.forEach((team) => {
        if (team._id == groupId) {
          if (!team.members.some((member) => member.email == curUser.email)) {
            team.members.push(curUser);
          } else {
            return res.status(400).send("User already in team");
          }
        }
      })
      let saveRes = iteration.save();
      if (saveRes) {
        return await getAllIterations(req, res);
      } else {
        return res.status(500).send(err.message);
      }
    })
}

async function leaveGroup(iterationId, groupId, req, res) {
  return iterationModel
    .findById(iterationId)
    .then(async (iteration) => {
      let curUser = new studentModel(req.body);
      let found = false;
      for (let i = 0; i < iteration.teams.length; i++) {
        if (iteration.teams[i]._id == groupId) {
          for (let j = 0; j < iteration.teams[i].members.length; j++) {
            if (iteration.teams[i].members[j].email == curUser.email) {
              iteration.teams[i].members.splice(j, 1);
              found = true;
              break
            }
          }
          break;
        }
      }
      let saveRes = iteration.save();
      if (saveRes) {
        return await getAllIterations(req, res);
      } else {
        return res.status(500).send(err.message);
      }
    })
    .catch(err => {
      return res.status(500).send(err.message);
    }
    );
}

function getTeamsFromIteration(iteration_id, req, res) {
  return iterationModel
    .findById(iteration_id)
    .then(iteration => {
      return res.status(200).send(iteration.teams);
    })
    .catch(err => {
      return res.status(500).send(err.message);
    });
}

function getGroups(iteration_id, req, res) {
  return iterationModel
    .findById(iteration_id)
    .then((iteration) => {
      return projectModel
        .find({
          _id: { $in: iteration.projects },
        })
        .then((projects) => {
          return studentModel
            .find({
              _id: { $in: iteration.students },
            })
            .then((students) => {
              return partnerModel
                .find({
                  _id: { $in: iteration.partners },
                })
                .then((partners) => {
                  let teams = [];
                  let teamSize = Math.floor(students.length / teams.length);
                  for (let i = 0; i < teams.length; i++) {
                    teams.push(students.slice(i * teamSize, (i + 1) * teamSize));
                  }
                  return res.status(200).json(teams);
                });
            });
        });
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
}

async function getAllIterations(req, res) {
  return iterationModel
    .find()
    .then(async (iterations) => {
      let ret = [];
      for (let i = 0; i < iterations.length; i++) {
        let curOrganization = await organizationModel.findById(iterations[i].organization);
        let curIteration = iterations[i].toObject();
        curIteration['organization'] = curOrganization.name;
        ret.push(curIteration);
      }
      return res.status(200).json(ret);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
}

function addIterationToDatabase(iteration, req, res) {
  for (let i = 0; i < 100; i++) {
    iteration.teams.push({
      group_name: "Group " + i
    });
  }
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
    .findByIdAndUpdate(id, iteration, { new: true })
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
      if(!teams || !projects || teams.length == 0 || projects.length == 0) {
        return res.status(404).send("No teams or projects found");
      }
      return res.status(200).send(projectMatching(teams, projects));
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
    if(teams[i].members.length > 0) {
      weightMatrix.push(getWeights(teams[i], projects));
    }
  }
  console.log(weightMatrix);
  return weightEvaluation(weightMatrix);
}

function getWeights(team, projects) {
  let teamVector = [];
  //Only compare partners with relevant project offerings - project interest is binary weight
  let relevantProjects = projects; //Relevant projects are the projects in the iteration
  for (let i = 0; i < relevantProjects.length; i++) {
    let matchingResult = categoryMatching(team, relevantProjects[i]);
    // if (matchingResult > 0) {
      //Change this to category matching
      teamVector.push(matchingResult);
    // } else {
    //   teamVector.push(-1);
    // }
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
  let n = weightMatrix.length; // |teams|
  let m = weightMatrix[0].length; // |projects|
  let matching = [];
  for (let i = 0; i < m; i++) {
    matching.push(-1);
  }
  let assignedProjects = 0;
  for (let i = 0; i < n; i++) {
    let jobsSeen = new Array(m);
    for (let j = 0; j < m; j++) {
      jobsSeen[j] = false;
    }
    if (bpm(weightMatrix, i, jobsSeen, matching)) {
      assignedProjects++;
    }
    console.log(jobsSeen);
    console.log(matching);
    console.log(assignedProjects)
    console.log(m)
    if(assignedProjects == m) {
      break;
    }
  }
  console.log(matching)
  return matching;
}

function bpm(weightMatrix, team, jobsSeen, matching) {
  for (let j = 0; j < weightMatrix[0].length; j++) {
    if (jobsSeen[j] == false && weightMatrix[team][j] > 0) {
      jobsSeen[j] = true;
      if (matching[j] < 0 || bpm(weightMatrix, matching[j], jobsSeen, matching)) {
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
  let match = 1;
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
