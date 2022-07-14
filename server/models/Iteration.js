var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');
const { projectSchema } = require('./Project');
const { studentSchema } = require('./Student');

const teamSchema = new Schema({
    name: {type: String, required: true, unique: true},
    members: {type: [studentSchema], required: true, default: []},
    category: {type: [String], required: true, default: []}
})

const iterationSchema = new Schema({
    name: {type: String, required: true},
    organization: {type: ObjectId, required: true},
    duration: {type: (Date, Date), required: true, default: (Date.now, Date.now)},
    teams: {type: [teamSchema]},
    projects: {type: [projectSchema]}
})

const iterationModel = mongoose.model('Iteration', iterationSchema);
module.exports = { iterationModel, iterationSchema }
