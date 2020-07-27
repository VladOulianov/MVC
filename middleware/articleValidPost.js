module.exports = (req,res,next)=>{
    if(!req.files){
        return res.redirect('/')
    }
  //console.log("resq.file");
    next()
}