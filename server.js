var express = require('express');
var conf = require('./server/config');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();



app.set('views', __dirname + '/server/views');
//app.set('views', conf.get('app-view'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index')
});

app.listen(3000);





