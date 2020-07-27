const User = require('../database/models/User')

module.exports = (req,res,next)=>{
    
    // Connection base de donnée
    User.findById(req.session.userId,(error, user)=>{
        if(error || !user){
            return res.redirect('/user/login')
        }

        next()
    })
    
    // Vérifier l'User

    
    // Si il est connue de la base de donnée

    
    // Sinon tu le rediriges


}