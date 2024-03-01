var Genre = require('../models/genre.model');

function getGenres(req,res){
    
    Genre
    .find({})
    .then(function(result){
        if(result.length==0){
            res.send({message:"Generos no encontrados."});
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
    getGenres
}