var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var config = require('./libs/config');
var log = require('./libs/log')(module);
var MongoStore = require('connect-mongo')(express);
var mailer = require('express-mailer');
var app = express();


// all environments
app.set('port', process.env.PORT || config.get('port'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.configure(function(){
    app.use('/public', express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.get('session:secret'),
        key: config.get('session:key'),
        cookie: config.get('session:cookie'),
        store: new MongoStore({'url': config.get('mongoose:uri')})
    }));
    app.use(require('./middleware/loadUser'));
    app.use(require('./middleware/loadHeaderAndFooter'));
    app.use(app.router);

    mailer.extend(app, {
        from: 'sidorov.serg@lanks.org',
        host: 'smtp.sweb.ru', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: 'sidorov.serg@lanks.org',
            pass: ''
        }
    });
});



require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
    log.info('Express server listening on port ' + app.get('port'));
});
