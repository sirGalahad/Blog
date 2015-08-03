var express = require('express');
var stylus = require('stylus');
var conf = require('./server/config');
var morgan  = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = conf.get('port');

function compite(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + conf.get('app-view'));
app.set('view engine', conf.get('app-engine'));


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compite
}));
app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
    res.render('index')
});

app.listen(port);





