var express = require('express/index.js');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

import {UsersController, AccountsController} from './app/controllers/';

var app = new express();

//Configure default port
var port = process.env.PORT || 3000;

//bariable de ambiente
var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env);

//Connect mongoose
mongoose.connect(config.database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

//For POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routes for API
var router = express.Router();

router.get('/', function(req, res) {
res.json({message: 'Welcome to API'});
});

app.use('/v1', router);

var usersController = new UsersController(app);
usersController.init();

var accountsController = new AccountsController(app);
accountsController.init();

app.listen(port);
console.log('API Listening in http://localhost:' + port);
