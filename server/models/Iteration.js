var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');
const { projectSchema } = require('./Project');

const iterationSchema = new Schema({
    name: {type: String, required: true},
    organization: {type: ObjectId, required: true},
    duration: {type: (Date, Date), required: true},
    projects: {type: [projectSchema]}
})

const iterationModel = mongoose.model('Iteration', iterationSchema);
module.exports = { iterationModel, iterationSchema }
