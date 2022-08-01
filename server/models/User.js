var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    capabilities: {type: [[String, Number]], required: true, default: []},
    password: {type: String, required: true, minlength: 8},
    created_at: {type: Date, required: true, default: Date.now}
})

const studentSchema = new Schema({
    ...userSchema.obj,
    student_id: {type: String, required: false},
    github_id: {type: String, required: false},
    iterations: {type: [ObjectId], default: []}
})

const partnerSchema = new Schema({
    ...userSchema.obj,
    iterations: {type: [ObjectId], required: true, default: []},
    affiliations: {type: [ObjectId], required: true, default: []}
})

const managementSchema = new Schema({
    ...userSchema.obj
})

const studentModel = mongoose.model('Student', studentSchema);
const partnerModel = mongoose.model('Partner', partnerSchema);
const managementModel = mongoose.model('Management', managementSchema);

module.exports = { studentModel, partnerModel, managementModel }
