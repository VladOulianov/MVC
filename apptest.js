const mongoose = require('mongoose')

const Article = require('./database/models/Article')

mongoose.connect('mongodb://localhost:27017/blog-test')


Article.findByIdAndUpdate("5f18277af6f6a034be0c3d2e",{
    title:"SpiderCochon"
},
(error,post)=>{
    console.log(error,post);
})

/*
Article.findById('5f18277af6f6a034be0c3d2e', (error,articles)=>{
    console.log(error,articles);
})
*/


/*
Article.find({
    intro: 'Test d\'intro'
}, (error, articles)=>{
    console.log(error, articles);
})


Article.create({
    title : "SpiderMan",
    intro : "Test d'intro",
    content : "Critique sur le film",
},(error,post)=>{
    console.log(error,post);
}

)
*/