const Article = require('../database/models/Article')
const mongoose = require('mongoose')

module.exports = (req,res)=>{
    Article.updateOne(
    {_id:req.params.id},
    {
        
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    },
    {multi:true},
    function(err){
        if(!err){
            res.redirect("/")
        }else {
            res.send(err)
        }
    }
)
}


