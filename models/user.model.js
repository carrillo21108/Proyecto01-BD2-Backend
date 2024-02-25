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
    likedMovies: [{type: Schema.Types.ObjectId, ref:'movie'}],
    likedGenres: [{type: Schema.Types.ObjectId, ref:'genre'}]
});

module.exports = mongoose.model('user', userSchema);