var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = Schema({
    adult:Boolean,
    backdrop_path:String,
    genres_ids:Array,
    id:Number,
    original_language:String,
    original_title:String,
    overview:String,
    popularity:Number,
    poster_path:String,
    release_date:String,
    title:String,
    video:Boolean,
    vote_avarage:Number,
    vote_count:Number
});

module.exports = mongoose.model('movie', movieSchema);