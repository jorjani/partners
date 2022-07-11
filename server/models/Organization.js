var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');
const { projectSchema } = require('./Project');

const organizationSchema = new Schema({
    name: {type: String, required: true},
    website: {type: String, required: true},
    type: {type: String, required: true},
    employee_count: {type: Number, required: true, default: 0},
    referral_info: {type: String},
    projects: {type: [projectSchema]},

})

const organizationModel = mongoose.model('Organization', organizationSchema);
module.exports = { organizationModel, organizationSchema }
