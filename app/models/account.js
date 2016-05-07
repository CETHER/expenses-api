var mongoose = require('mongoose');
var base = require('./base');

var AccountsSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
  name: String,
  description: String
});

AccountsSchema.plugin(base);

module.exports = mongoose.model('Accounts', AccountsSchema);
