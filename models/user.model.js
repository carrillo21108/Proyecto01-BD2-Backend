var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name:String,
    lastname:String,
    age:Number,
    gender:String,
    credentials: {
        mail:String,
        password:String
    },
    likedMovies: [{type: Schema.Types.ObjectId, ref:'movies'}],
    likedGenres: Array
});

module.exports = mongoose.model('users', userSchema);