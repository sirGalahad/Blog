var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: __dirname + '/server/config/config.json' });

module.exports = nconf;
