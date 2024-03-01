var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name:String,
    lastname:String,
    age:Number,
    gender:String,
    credentials: {
        creationDate:Date,
        mail:String,
        password:String
    },
    likedMovies: [{type: Schema.Types.ObjectId, ref:'movie'}],
    likedGenres: Array
});

module.exports = mongoose.model('user', userSchema);