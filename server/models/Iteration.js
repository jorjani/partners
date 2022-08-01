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

const iterationSchema = new Schema({
    name: {type: String, required: true},
    organization: {type: ObjectId, required: true},
    duration: {type: (Date, Date), required: true, default: (Date.now, Date.now)},
    teams: {type: [teamSchema], default: []},
    projects: {type: [projectSchema], default: []}
})

const iterationModel = mongoose.model('Iteration', iterationSchema);
module.exports = { iterationModel, iterationSchema }
