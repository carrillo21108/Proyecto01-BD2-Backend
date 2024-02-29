var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var credentialSchema = Schema({
    mail:String,
    password:String
});

module.exports = mongoose.model('credentials', credentialSchema);