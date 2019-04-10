const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
const config = require('./config/config');
const passport = require('passport');
const register = require('./controllers/register');
const login = require('./controllers/login');
const fblogin = require('./controllers/fblogin');
const forgot = require('./controllers/forgot');
const session = require('express-session');
const linkedin = require('./controllers/linkedin');
const user = require('./controllers/user');
const jobDetails = require('./controllers/jobdetails');
const appliedJobs = require('./controllers/appliedJobs');
const failedJobs = require('./controllers/failedJobs');
const savedJobs = require('./controllers/savedJobs');
const dailogflow = require('./controllers/dailogflow');

mongoose.connect(config.dbUrl,{useNewUrlParser:true}).then(()=>
console.log('mongoDb connected')).catch((err)=>
console.log(JSON.stringify(err,undefined,2)));


PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret : 'anystringoftext',
    saveUninitialized : true,
    resave : true
}));
app.use(methodOverride());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use((req,res,next)=>{
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
}
next();
});
  

app.use(passport.initialize());
app.use(passport.session());

//passport middleware
require('./config/passport')(passport);


app.use('/api',register);
app.use('/api',login);
app.use('/api',fblogin);
app.use('/api',forgot);
app.use('/api',linkedin);
app.use('/api',user);
app.use('/api',jobDetails);
app.use('/api',appliedJobs);
app.use('/api',failedJobs);
app.use('/api',savedJobs);
app.use('/api',dailogflow);


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));