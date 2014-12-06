var Education = require('../models/education').Education;
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

exports.getAllEducations = function(req, res){
    if (req.query.educationID) {
        Education.find({_id: req.query.educationID}, function(err, educations){
            res.render('educations/single-education', educations[0]);
        });
    } else {
        Education.find({}, function(err, educations){
            educations.reverse();
            res.render('educations/educationsList', {allEducations: educations});
        });
    }
};

exports.getAllEducationsJSON = function(req, res){
    Education.find({}, function(err, educations){
        res.send(educations);
    });
};

exports.addEducation = function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.on ('file', function(name, file){
        if (file.name){
            fs.rename(file.path, "./public/img/educations/" + file.name, function(err){
                if (err) throw err;
            });
        } else {
            fs.unlink(file.path, function(err){
                if (err) throw err;
            });
        }
    });
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        var newEducation = new Education({
            title:  fields.title,
            logo:  files.picture.name,
            shortDescription:  fields.shortDescription,
            fullDescription: fields.fullDescription
        });
        console.log(newEducation)
        newEducation.save(function (err) {
            if (err) throw err;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    });
};

exports.getEducation = function(req, res){
    Education.findById(req.params.id, function (err, education) {
        if (err) throw err;
        res.send(education);
    });
};

exports.updateEducation = function(req, res){
    Education.findById(req.params.id, function (err, education) {
        if (err) throw err;
        if(!education) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir = "./temp";
            form.keepExtensions = true;
            form.on ('file', function(name, file){
                if (file.name){
                    fs.rename(file.path, "./public/img/educations/" + file.name, function(err){
                        if (err) throw err;
                    });
                } else {
                    fs.unlink(file.path, function(err){
                        if (err) throw err;
                    });
                }
            });
            form.parse(req, function(err, fields, files) {
                if (err) throw err;
                education.title = fields.title;
                if (files.picture.name) education.logo = files.picture.name;
                education.shortDescription =  fields.shortDescription;
                education.fullDescription = fields.fullDescription;
                education.save(function (err) {
                    if (err) throw err;
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                });
            });
        }
    });
};

exports.deleteEducation = function(req, res){
    Education.findById(req.params.id, function (err, education) {
        if (err) throw err;
        if(!education) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            education.remove(function (err) {
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

exports.addEducationPage = function(req, res){
    res.render('educations/addEducation');
};
