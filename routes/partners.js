var Partner = require('../models/partner').Partner;
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

exports.getAllPartners = function(req, res){
    if (req.query.partnerID) {
        Partner.find({_id: req.query.partnerID}, function(err, partners){
            res.render('partners/single-partner', partners[0]);
        });
    } else {
        Partner.find({}, function(err, partners){
            partners.reverse();
            res.render('partners/partnersList', {allPartners: partners});
        });
    }
};

exports.getAllPartnersJSON = function(req, res){
    Partner.find({}, function(err, partners){
        res.send(partners);
    });
};

exports.addPartner = function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.on ('file', function(name, file){
        if (file.name){
            fs.rename(file.path, "./public/img/partners/" + file.name, function(err){
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
        var newPartner = new Partner({
            title:  fields.title,
            logo:  files.picture.name,
            shortDescription:  fields.shortDescription,
            year:  fields.year,
            urAddress: fields.urAddress,
            factAddress: fields.factAddress,
            phone: fields.phone,
            email: fields.email,
            website: fields.website,
            director: fields.director,
            accountant: fields.accountant,
            inn: fields.inn,
            okved: fields.okved,
            fullDescription: fields.fullDescription,
            partnership: fields.partnership
        });
        console.log(newPartner)
        newPartner.save(function (err) {
            if (err) throw err;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    });
};

exports.getPartner = function(req, res){
    Partner.findById(req.params.id, function (err, partner) {
        if (err) throw err;
        res.send(partner);
    });
};

exports.updatePartner = function(req, res){
    Partner.findById(req.params.id, function (err, partner) {
        if (err) throw err;
        if(!partner) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir = "./temp";
            form.keepExtensions = true;
            form.on ('file', function(name, file){
                if (file.name){
                    fs.rename(file.path, "./public/img/partners/" + file.name, function(err){
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
                partner.title = fields.title;
                if (files.picture.name) partner.logo = files.picture.name;
                partner.shortDescription =  fields.shortDescription;
                partner.year =  fields.year;
                partner.urAddress = fields.urAddress;
                partner.factAddress = fields.factAddress;
                partner.phone = fields.phone;
                partner.email = fields.email;
                partner.website = fields.website;
                partner.director = fields.director;
                partner.accountant = fields.accountant;
                partner.inn = fields.inn;
                partner.okved = fields.okved;
                partner.fullDescription = fields.fullDescription;
                partner.partnership = fields.partnership;
                partner.save(function (err) {
                    if (err) throw err;
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                });
            });
        }
    });
};

exports.deletePartner = function(req, res){
    Partner.findById(req.params.id, function (err, partner) {
        if (err) throw err;
        if(!partner) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            partner.remove(function (err) {
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

exports.addPartnerPage = function(req, res){
    res.render('partners/addPartner');
};
