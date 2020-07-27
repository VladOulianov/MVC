const Article = require('../database/models/Article')
//const mongoose = require('mongoose')

module.exports = (req,res)=>{
    Article.findOne(
        {_id:req.params.id},
        function(err,article){
            if(!err){
                res.render("editer", {
                   _id: article.id,
                   title: article.title,
                   content: article.content,
                   author: article.author
                   
                })
            }else {
                res.send(err)
            }
        }
    )
    
}