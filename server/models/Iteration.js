var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');
const { projectSchema } = require('./Project');
const { studentSchema } = require('./User');

const teamSchema = new Schema({
    group_name: {type: String, required: true},
    members: {type: [studentSchema], required: true, default: []},
    category: {type: [String], required: true, default: []}
})

const iterationConfigSchema = new Schema({
    executive_summaries: {type: String, required: false},
    project_overview_examples: {type: String, required: false},
    program_requirements_expectations: {type: String, required: false},
    partner_testimonals: {type: String, required: false},
    optional_webinar: {type: String, required: false},
    proposal_submission_info: {type: String, required: false},
    estimated_timeline: {type: String, required: false},
    faqs: {type: String, required: false},
})

const iterationSchema = new Schema({
    name: {type: String, required: true},
    organization: {type: ObjectId, required: true},
    duration: {type: (Date, Date), required: true, default: (Date.now, Date.now)},
    teams: {type: [teamSchema], default: []},
    projects: {type: [projectSchema], default: []},
    config: {type: iterationConfigSchema, default: {}}
})

const iterationModel = mongoose.model('Iteration', iterationSchema);
module.exports = { iterationModel, iterationSchema }
