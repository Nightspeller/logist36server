var Participant = require('../models/participant').Participant;
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

exports.getAllParticipants = function(req, res){
    if (req.query.participantID) {
        Participant.find({_id: req.query.participantID}, function(err, participants){
            res.render('participants/single-participant', participants[0]);
        });
    } else {
        Participant.find({}, function(err, participants){
            participants.reverse();
            res.render('participants/participantsList', {allParticipants: participants});
        });
    }
};

exports.getAllParticipantsJSON = function(req, res){
    Participant.find({}, function(err, participants){
        res.send(participants);
    });
};

exports.addParticipant = function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.on ('file', function(name, file){
        if (file.name){
            fs.rename(file.path, "./public/img/participants/" + file.name, function(){});
        } else {
            fs.unlink(file.path, function(){});
        }
    });
    form.parse(req, function(err, fields, files) {
        var newParticipant = new Participant({
            title:  fields.title,
            logo:  files.picture.name,
            shortDescription:  fields.shortDescription,
            year:  fields.year,
            urAddress: fields.urAddress,
            factAddress: fields.factAddress,
            stockAddress: fields.stockAddress,
            phone: fields.phone,
            email: fields.email,
            website: fields.website,
            director: fields.director,
            accountant: fields.accountant,
            inn: fields.inn,
            okved: fields.okved,
            fullDescription: fields.fullDescription,
            autopark: fields.autopark,
            stuff: fields.stuff,
            additionalInfo: fields.additionalInfo,
            contactPerson: fields.contactPerson,
            contactPhone: fields.contactPhone,
            contactEmail: fields.contactEmail
        });
        newParticipant.save(function (err) {
            if (err) throw err;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    });
};

exports.getParticipant = function(req, res){
    Participant.findById(req.params.id, function (err, participant) {
        res.send(participant);
    });
};

exports.updateParticipant = function(req, res){
    Participant.findById(req.params.id, function (err, participant) {
        if(!participant) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir = "./temp";
            form.keepExtensions = true;
            form.on ('file', function(name, file){
                if (file.name){
                    fs.rename(file.path, "./public/img/participants/" + file.name, function(){});
                } else {
                    fs.unlink(file.path, function(){});
                }
            });
            form.parse(req, function(err, fields, files) {
                participant.title = fields.title;
                if (files.picture.name) participant.logo = files.picture.name;
                participant.shortDescription =  fields.shortDescription;
                participant.year =  fields.year;
                participant.urAddress = fields.urAddress;
                participant.factAddress = fields.factAddress;
                participant.stockAddress = fields.stockAddress;
                participant.phone = fields.phone;
                participant.email = fields.email;
                participant.website = fields.website;
                participant.director = fields.director;
                participant.accountant = fields.accountant;
                participant.inn = fields.inn;
                participant.okved = fields.okved;
                participant.fullDescription = fields.fullDescription;
                participant.autopark = fields.autopark;
                participant.stuff = fields.stuff;
                participant.additionalInfo = fields.additionalInfo;
                participant.contactPerson = fields.contactPerson;
                participant.contactPhone = fields.contactPhone;
                participant.contactEmail = fields.contactEmail;
                participant.save(function (err) {
                    if (err) throw err;
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                });
            });
        }
    });
};

exports.deleteParticipant = function(req, res){
    Participant.findById(req.params.id, function (err, participant) {
        if(!participant) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            participant.remove(function (err) {
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

exports.addParticipantPage = function(req, res){
    res.render('participants/addParticipant');
};