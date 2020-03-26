const   express                 = require('express'),
        mongoose                = require('mongoose'),
        passport                = require('passport'),
        bodyParser              = require('body-parser'),
        LocalStrategy           = require('passport-local'),
        passportLocalMongoose   = require('passport-local-mongoose'),
        User                    = require('./models/user')


const PORT = process.env.PORT || 3001

mongoose.connect('mongodb://localhost:27017/camp', { useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));

app.use(require('express-session')({
    secret:'this is dans secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/secret' , isLoggedIn ,(req, res) => {
    res.render('secret')
})

// auth routes

// show sign up form
app.get('/register', (req, res) => {
    res.render('register')
})

// handles user signup
app.post('/register', (req,res) => {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err){
            console.log(err)
            return res.render('register')
        } else {
            passport.authenticate('local')(req, res, ()=> {
                res.redirect('/secret');
            })
        }
    })
})

// login routes
//render login form
app.get('/login', (req, res) => {
    res.render('login')
})

// login logic
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), (req, res) => {    
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

// Middleware
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next
    }
    res.redirect('/login')
}

app.listen(PORT, () => {
    console.log('server has started')
})