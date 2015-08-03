var express = require('express');
var stylus = require('stylus');
var conf = require('./server/config');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || conf.get('port');
var db = mongoose.connection;

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


if (env === 'development') {
    mongoose.connect('mongodb://localhost/blog');
} else {
    mongoose.connect('mongodb://DeWitt:IsaacClark@ds045089.mongolab.com:45089/blog');
}

db.on('error', console.error.bind(console, 'connection error...'));

db.once('open', function callback() {
    console.log('blog db opened.');
});

var messageSchema = mongoose.Schema({
    message: String
});

var Message = mongoose.model('Message', messageSchema);
var mongoMessage;

Message.findOne().exec(function (err, messageDoc) {
    mongoMessage = messageDoc.message
});


app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    })
});

app.listen(port);





