var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var config = require('./../libs/config');


exports.registrationObject = function(app){
    this.sendFormViaEmail = function(req, res){
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.parse(req, function(err, fields, files) {
            if(err) throw err;
            app.mailer.send('registrationEmail', {
                to: config.get('registrationEmail'), // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Test Email', // REQUIRED.
                mailData: fields
            }, function (err) {
                if (err) {
                    // handle error
                    console.log(err);
                    res.send('There was an error sending the email');
                    return;
                }
                res.send('Email Sent');
            });
        });
    };
    this.sendPage = function(req,res,nex){
        res.render('registration');
    };
    return this;
};

/*exports.sendFormViaEmail = function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields, files) {
        if(err) throw err;
        app.mailer.send('registrationEmail', {
            to: 'serj.nights@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'Test Email', // REQUIRED.
            mailData: fields
        }, function (err) {
            if (err) {
                // handle error
                console.log(err);
                res.send('There was an error sending the email');
                return;
            }
            res.send('Email Sent');
        });
    });
};*/


/*
exports.getAllEvents = function(req, res){
    if (req.query.eventID) {
        Event.find({_id: req.query.eventID}, function(err, events){
            if(err) throw err;
            res.render('single-event', events[0]);
        });
    } else {
        Event.find({}, function(err, events){
            if(err) throw err;
            events.reverse();
            res.render('eventsList', {allEvents: events});
        });
    }
};

exports.getAllEventsJSON = function(req, res){
    Event.find({}, function(err, events){
        if(err) throw err;
        res.send(events);
    });
};

exports.addEvent = function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.on ('file', function(name, file){
        if (file.name){
            fs.rename(file.path, "./public/img/events/" + file.name, function(err){
                if (err) throw err;
            });
        } else {
            fs.unlink(file.path, function(err){
                if(err) throw err;
            });
        }
    });
    form.parse(req, function(err, fields, files) {
        if(err) throw err;
        var newEvent = new Event({ title:  fields.title,
            logo: files.picture.name,
            shortDescription:  fields.shortDescription,
            description:  fields.description,
            place:  fields.place,
            link: 'events.html',
            date:  fields.date });
        newEvent.save(function (err) {
            if (err) throw err;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    });
};

exports.getEvent = function(req, res){
    Event.findById(req.params.id, function (err, event) {
        if (err) throw err;
        res.send(event);
    });
};

exports.updateEvent = function(req, res){
    Event.findById(req.params.id, function (err, event) {
        if(err) throw err;
        if(!event) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir = "./temp";
            form.keepExtensions = true;
            form.on ('file', function(name, file){
                if (file.name){
                    fs.rename(file.path, "./public/img/events/" + file.name, function(err){
                        if(err) throw err;
                    });
                } else {
                    fs.unlink(file.path, function(err){
                        if(err) throw err;
                    });
                }
            });
            form.parse(req, function(err, fields, files) {
                if(err) throw err;
                event.title = fields.title;
                if (files.picture.name) event.logo = files.picture.name;
                event.shortDescription = fields.shortDescription;
                event.description = fields.description;
                event.place = fields.place;
                event.link = 'events.html';
                event.date = fields.date;
                event.save(function (err) {
                    if (err) throw err;
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                });
            });
        }
    });
};

exports.deleteEvent = function(req, res){
    Event.findById(req.params.id, function (err, event) {
        if(err) throw err;
        if(!event) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            event.remove(function (err) {
                if (!err) {
                    res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            });
        }
    });
};
*/
