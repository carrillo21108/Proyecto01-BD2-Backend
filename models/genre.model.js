var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = Schema({
    id:Number,
    name:String
});

module.exports = mongoose.model('genre', genreSchema);