var Movie = require('../models/movie.model');
var User = require('../models/user.model');
var ObjectId = require('mongoose').Types.ObjectId;

function getMoviesCount(req,res){
    Movie
    .countDocuments({})
    .then(function(result){
        res.send({message:result});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function getMovies(req,res){
    Movie
    .find({})
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

function getMoviesDetail(req,res){
    var params = req.body;

    var movies = params.movies.split(",")
    var moviesList = []
    movies.forEach((elem,idx)=>{
        moviesList.push(new ObjectId(elem))
    })

    console.log(moviesList)

    Movie
    .aggregate([{$match:{_id:{$in:moviesList}}}])
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
    {
        $group: {
            _id: "$original_title",  // Agrupar por título
            doc: { $first: "$$ROOT" }  // $$ROOT se refiere al documento original
        }
    },
    {$replaceRoot: { newRoot: "$doc" } },  // Reemplaza el documento raíz por el documento original
    {$project:{"_id":1}},
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
    {$match:{likedGenres:{$elemMatch:{$in:genresList}},"credentials.mail":{$ne:params.mail}}},
    {$unwind:"$likedMovies"},
    {$addFields: {"_id": "$likedMovies"}},
    {$project:{"_id":1}},
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

function popularRecommendation(req, res) {
    var params = req.body;

    Movie.aggregate([
        {$match: { vote_average: { $gte: 8 }, vote_count: { $gte: 500 } } },
        {
            $group: {
                _id: "$original_title",  // Agrupar por título
                doc: { $first: "$$ROOT" }  // $$ROOT se refiere al documento original
            }
        },
        {$replaceRoot: { newRoot: "$doc" } },  // Reemplaza el documento raíz por el documento original
        {$sort: { popularity: -1 } },
        {$project:{"_id":1}},
        {$skip: parseInt(params.skip) },
        {$limit: parseInt(params.limit) }
    ])
    .then(function(result) {
        if (result.length == 0) {
            res.send({ message: "Peliculas no encontradas." });
        } else {
            res.send(result);
        }
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).send({ message: 'Error general' });
    });
}


function releaseRecommendation(req,res){
    var params = req.body;

    Movie.aggregate([
        {$match: { $and:[
            {vote_average: { $gte: 5 }},
            {vote_count: { $gte: 100 }},
            {release_date: { $gte: "2020-01-01" }},
            {release_date: { $lte: "2024-02-01" }}
        ] }},
        {
            $group: {
                _id: "$original_title",  // Agrupar por título
                doc: { $first: "$$ROOT" }  // $$ROOT se refiere al documento original
            }
        },
        {$replaceRoot: { newRoot: "$doc" } },  // Reemplaza el documento raíz por el documento original
        {$sort: { release_date: -1 } },
        {$project:{"_id":1}},
        {$skip: parseInt(params.skip) },
        {$limit: parseInt(params.limit) }
    ])
    .then(function(result) {
        if (result.length == 0) {
            res.send({ message: "Peliculas no encontradas." });
        } else {
            res.send(result);
        }
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).send({ message: 'Error general' });
    });
}

module.exports = {
    getMovies,
    getMoviesCount,
    popularRecommendation,
    releaseRecommendation,
    genreRecommendation,
    userRecommendation,
    getMoviesDetail
}