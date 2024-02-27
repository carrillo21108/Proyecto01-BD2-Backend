var User = require('../models/user.model');
var Credential = require('../models/credential.model');

function login(req,res){
    var params = req.body;

    User.aggregate([
        {$match:{"credentials.mail":params.mail,
        "credentials.password":params.password}},
        {$project:{"name":1,"credentials.mail":1}}
    ]).exec()
    .then(function(result){
        if(result.length==0){
            res.send({message:"Contraseña y/o correo electrónico incorrecto."});
        }else{
            res.send(result);
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function create(req,res){
    var params = req.body;
    var user = new User();
    var credential = new Credential();

    user.name = params.name;
    user.lastname = params.lastname;
    user.age = parseInt(params.age);
    user.gender = params.gender;
    credential.mail = params.mail;
    credential.password = params.password;
    user.credentials = credential
    user.likedMovies = [];
    user.likedGenres = [];

    user.save()
    .then(function(){
        res.send({message:'Usuario agregado con exito a la DB.'});
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function profile(req,res){
    var params = req.body;
    User.findOne({"credentials.mail":params.mail})
    .exec()
    .then(function(result){
        if(result==null){
            res.send({message:"Perfil de usuario no encontrado."});
        }else{
            res.send(result);
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function updateUser(req,res){
    var params = req.body;

    User
    .findOneAndUpdate({"credentials.mail":params.currentMail},
    {$set:{"credentials.mail":params.mail,
    "credentials.password":params.password,
    age:params.age,
    gender:params.gender}},{new:true})
    .exec()
    .then(function(result){
        if(result==null){
            res.send({message:'Usuario no actualizado'});
        }else{
            res.send(result);
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function deleteUser(req,res){
    var params = req.body;

    User
    .deleteOne({"credentials.mail":params.mail})
    .exec()
    .then(function(result){
        if(result["deletedCount"]==0){
            res.send({message:'Usuario no eliminado'});
        }else{
            res.send({message:'Usuario eliminado con exito'});
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function likeMovie(req,res){
    var params = req.body;
    
    User
    .findOneAndUpdate({"credentials.mail":params.mail},
    {$push:{likedMovies:params.movieId}},{new:true})
    .exec()
    .then(function(result){
        if(result==null){
            res.send({message:'Relacion IN_LIKE_MOVIE no creada'});
        }else{
            res.send({message:'Relacion IN_LIKE_MOVIE creada con exito.'});
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function dislikeMovie(req,res){
    var params = req.body;
    
    User
    .findOneAndUpdate({"credentials.mail":params.mail},
    {$pull:{likedMovies:params.movieId}},{new:true})
    .exec()
    .then(function(result){
        if(result==null){
            res.send({message:'Relacion IN_LIKE_MOVIE no eliminada'});
        }else{
            res.send({message:'Relacion IN_LIKE_MOVIE eliminada con exito.'});
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function likeGenre(req,res){
    var params = req.body;
    
    User
    .findOneAndUpdate({"credentials.mail":params.mail},
    {$push:{likedGenres:params.genreId}},{new:true})
    .exec()
    .then(function(result){
        if(result==null){
            res.send({message:'Relacion IN_LIKE_GENRE no creada'});
        }else{
            res.send({message:'Relacion IN_LIKE_GENRE creada con exito.'});
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function dislikeGenre(req,res){
    var params = req.body;
    
    User
    .findOneAndUpdate({"credentials.mail":params.mail},
    {$pull:{likedGenres:params.genreId}},{new:true})
    .exec()
    .then(function(result){
        if(result==null){
            res.send({message:'Relacion IN_LIKE_GENRE no eliminada'});
        }else{
            res.send({message:'Relacion IN_LIKE_GENRE eliminada con exito.'});
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function getLikesUser(req,res){
    var params = req.body;

    User
    .aggregate([
        {$match:{"credentials.mail":params.mail}},
        {$project:{"likedMovies":1}}
    ])
    .exec()
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

function getLikeUserMovie(req,res){
    var params = req.body;

    User
    .findOne({"credentials.mail":params.mail,"likedMovies":{$elemMatch:{$eq:params.movieId}}})
    .exec()
    .then(function(result){
        if(result==null){
            res.send({message:"Pelicula sin like de usuario."});
        }else{
            res.send({message:"Pelicula con like de usuario."});
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).send({message:'Error general'});
    });
}

function getLikesGenre(req,res){
    var params = req.body;

    User
    .aggregate([
        {$match:{"credentials.mail":params.mail}},
        {$project:{"likedGenres":1}}
    ])
    .exec()
    .then(function(result){
        if(result.length==0){
            res.send({message:"Géneros no encontrados."});
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
    login,
    create,
    profile,
    updateUser,
    deleteUser,
    likeMovie,
    dislikeMovie,
    likeGenre,
    dislikeGenre,
    getLikesUser,
    getLikeUserMovie,
    getLikesGenre
}