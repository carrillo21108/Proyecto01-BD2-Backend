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
    var credential = new Credential()

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
    .findOneAndUpdate({"credentials.mail":params.mail},
    {$set:{"credentials.mail":params.mail,
    "credentials.password":params.password,
    age:params.age,
    genre:params.genre}},{new:true})
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

module.exports = {
    login,
    create,
    profile,
    updateUser,
    deleteUser
}