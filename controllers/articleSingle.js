// Post
const Post = require('../database/models/Article')

module.exports =  async (req,res)=>{
    //console.log(req.params);
    const article = await Post.findById(req.params.id)

    res.render('articles', {article}
)}