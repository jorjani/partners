var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');
const { iterationSchema } = require('./Iteration');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    capabilities: {type: [(String, String)], required: true},
    password: {type: String, required: true, minlength: 8},
    created_at: {type: Date, required: true, default: Date.now}
})

const studentSchema = new Schema({
    ...userSchema.obj,
    student_id: {type: String, required: true},
    github_id: {type: String, required: true},
    iteratiions: {type: [iterationSchema], required: true}
})

const partnerSchema = new Schema({
    ...userSchema.obj,
    iterations: {type: [iterationSchema], required: true, default: []},
    affiliations: {type: [ObjectId], required: true}
})

const managementSchema = new Schema({
    ...userSchema.obj
})

const studentModel = mongoose.model('Student', studentSchema);
const partnerModel = mongoose.mode('Partner', partnerSchema);
const managementModel = mongoose.mode('Partner', managementSchema);

module.exports = { studentModel, partnerModel, managementModel }
