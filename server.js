var express = require('express');

var bodyParser = require('body-parser');

var app = new express();

//Configure default port
var port = process.env.PORT || 3000;

//For POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routes for API
var router = express.Router();

router.get('/', function(req, res) {
res.json({message: 'Welcome to API'});
});

app.use('/v1', router);

app.listen(port);
console.log('API Listening in http://localhost:' + port);
