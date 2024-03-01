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
    vote_count:Number,
    cast:[{
        adult:Boolean,
        gender:Number,
        id:String,
        known_for_department:String,
        name:String,
        original_name:String,
        popularity:Number,
        profile_path:String,
        cast_id:Number,
        character:String,
        credit_id:String,
        order:Number
    }]
});

module.exports = mongoose.model('movie', movieSchema);