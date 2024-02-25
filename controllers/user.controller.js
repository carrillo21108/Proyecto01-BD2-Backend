var User = require('../models/user.model');

function login(req,res){
    var params = req.body;

    User.findOne({
        "credentials.mail":params.mail,
        "credentials.password":params.password
    }).exec()
    .then(function(result){
        if(result==null){
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

module.exports = {
    login
}