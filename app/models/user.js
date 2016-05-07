const mongoose = require('mongoose');
const base = require('./base');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String
});

UserSchema.plugin(base);

module.exports = mongoose.model('User', UserSchema);
