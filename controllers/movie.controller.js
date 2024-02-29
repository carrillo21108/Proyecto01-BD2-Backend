var Movie = require('../models/movie.model');
var User = require('../models/user.model');

function getMovies(req,res){
    var params = req.body;
    Movie
    .aggregate([
        {$skip:parseInt(params.skip)},
        {$limit:parseInt(params.limit)}])
    .then(function(result){
        if(result.length==0){
            res.send({message:"Peliculas no encontradas."});
        }else{
            res.send(result);
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function genreRecommendation(req,res){
    var params = req.body;

    var genres = params.genres.split(",")
    var genresList = []
    genres.forEach((elem,idx)=>{
        genresList.push(parseInt(elem))
    })

    Movie
    .aggregate([
    {$match:{genre_ids:{$elemMatch:{$in:genresList}}}},
    {$skip:parseInt(params.skip)},
    {$limit:parseInt(params.limit)}])
    .then(function(result){
        if(result.length==0){
            res.send({message:"Peliculas no encontradas."});
        }else{
            res.send(result);
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function userRecommendation(req,res){
    var params = req.body;

    var genres = params.genres.split(",")
    var genresList = []
    genres.forEach((elem,idx)=>{
        genresList.push(parseInt(elem))
    })

    User
    .aggregate([
    {$match:{likedGenres:{$elemMatch:{$in:genresList}}}},
    {$project:{"likedMovies":1}},
    {$skip:parseInt(params.skip)},
    {$limit:parseInt(params.limit)}])
    .then(function(result){
        if(result.length==0){
            res.send({message:"Peliculas no encontradas."});
        }else{
            res.send(result);
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

module.exports = {
    getMovies,
    genreRecommendation,
    userRecommendation
}