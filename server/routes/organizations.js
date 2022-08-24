// Organizations Route

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ObjectId = require("mongodb").ObjectId;
var { organizationModel } = require("../models/Organization");
var { projectModel } = require("../models/Project");
var { iterationModel } = require("../models/Iteration");
var { partnerModel } = require("../models/User");
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

router.route("/invite").post(async (req, res) => {
    try {
        const info = req.body;
        return await inviteOrganizationToDatabase(info, req, res);
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

function inviteOrganizationToDatabase(info, req, res) {
    const newOrganization = new organizationModel({
        name: info.orgName,
        website: info.website,
        type: info.type,
        employee_count: info.employeeCount,
        referral_info: info.referralInfo,
        projects: []
    });
    if (!newOrganization.name || !newOrganization.website || !newOrganization.type || !newOrganization.employee_count || !newOrganization.referral_info) {
        return res.status(400).send("Missing required Organization fields");
    }
    if (!info.projName || !info.iterId || !info.contactInfo || !info.category || !info.startDate || !info.endDate) {
        return res.status(400).send("Missing required Project fields");
    }
    newOrganization.save((err, organization) => {
        //create project for organization
        if (err) {
            return res.status(500).send(err.message);
        }
        //get id of Partner with info.contactInfo.email from partners collection
        partnerModel.findOne({ email: info.contactInfo.email }, (err, partner) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (!partner) {
                return res.status(400).send("Partner not found");
            }
            let newContactInfo = info.contactInfo;
            newContactInfo['ref_id'] = partner._id;
            const newProject = new projectModel({
                name: info.projName,
                organization_id: organization._id,
                iteration_id: info.iterId,
                contact_info: newContactInfo,
                category: info.category,
                start_date: info.startDate,
                end_date: info.endDate,
                config: info.config
            });
            console.log(newProject);
            newProject.save((err, project) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                //add project to organization
                organization.projects.push(project);
                organization.save((err, organization) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    //add project to iteration
                    iterationModel.findById(info.iterId, (err, iteration) => {
                        if (err) {
                            return res.status(500).send(err.message);
                        }
                        iteration.projects.push(project);
                        iteration.save((err, iteration) => {
                            if (err) {
                                return res.status(500).send(err.message);
                            }
                            return res.status(200).json("Organization and Project created");
                        });
                    })
                })
            })
        }
        );
    }
    );
}



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