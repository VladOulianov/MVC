const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const MomentHandler = require("handlebars.moment");
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')//(expressSession)
const connectFlash = require('connect-flash')

// Controller //
// article
const articleAddController = require('./controllers/articleAdd')
const homePage = require('./controllers/homePage')
const articleSingleController = require('./controllers/articleSingle')
const articlePostController = require('./controllers/articlePost')
const articleGetEditController = require('./controllers/articleGetEdit')
const articleEditController = require('./controllers/aticleEdit')
const contactController = require('./controllers/contactController')
// user
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')


// Express
const app = express()

// Mongostore
const mongoStore = MongoStore(expressSession)
//Mongoose
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true});

// Connect-Flash
app.use(connectFlash())

// Express-Session
app.use(expressSession({
    secret : 'securite',
    name: 'biscuit',
    resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}))

// Statique
app.use(express.static('public'))

// Body-Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// upload
app.use(fileUpload())

//date format
MomentHandler.registerHelpers(Handlebars);

// auth middleware
const auth = require ("./middleware/auth")
const redirectAuthSucess = require("./middleware/redirectAuthSucess")


// route
app.engine('hbs', exphbs({defaultLayout:'main', extname: 'hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'hbs');
app.use('*', (req, res, next)=>{
  res.locals.user = req.session.userId;
  console.log(res.locals.user)
  next()
})
// Middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)
//app.use('/articles/add',auth)



app.get ('/', homePage)


// Articles
app.get ('/articles/add',auth, articleAddController)
app.get ('/articles/:id', articleSingleController)
app.post("/articles/post",auth,articleValidPost, articlePostController)
app.get("/articles/edit", articleGetEditController)
//app.get("/articles/edit", articleEditController)

// User
app.get('/user/create', userCreate)
app.post('/user/register', userRegister)
app.get('/user/login', userLogin)
app.post('/user/login/auth', userLoginAuth)
app.get('/user/logout', userLogout)

// Contact
app.get ('/contact', contactController)

// Error 404
app.use((req,res)=>{
  res.render('error404')
})


app.listen(4008,function(){
    console.log("le server tourne sur le port 4008");
})