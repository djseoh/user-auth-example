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

app.use(require('express-session')({
    secret:'this is dans secret',
    resave: false,
    saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: true}));const app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/secret' ,(req, res) => {
    res.render('secret')
})

app.listen(PORT, () => {
    console.log('server has started')
})