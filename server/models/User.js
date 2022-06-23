var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    created_at: {type: Date, required: true, default: Date.now}
})

const userModel = mongoose.model('Users', userSchema);
module.exports = { userModel }
