var Company = require('../models/company').Company;
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

exports.getAllCompanies = function(req, res){
    if (req.query.companyID) {
        Company.find({_id: req.query.companyID}, function(err, companies){
            res.render('companies/single-company', companies[0]);
        });
    } else {
        Company.find({}, function(err, companies){
            companies.reverse();
            res.render('companies/companiesList', {allCompanies: companies});
        });
    }
};

exports.getAllCompaniesJSON = function(req, res){
    Company.find({}, function(err, companies){
        res.send(companies);
    });
};

exports.addCompany = function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.on ('file', function(name, file){
        if (file.name){
            fs.rename(file.path, "./public/img/companies/" + file.name, function(err){
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
        var newCompany = new Company({
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
            fullDescription: fields.fullDescription
        });
        console.log(newCompany)
        newCompany.save(function (err) {
            if (err) throw err;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    });
};

exports.getCompany = function(req, res){
    Company.findById(req.params.id, function (err, company) {
        if (err) throw err;
        res.send(company);
    });
};

exports.updateCompany = function(req, res){
    Company.findById(req.params.id, function (err, company) {
        if (err) throw err;
        if(!company) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir = "./temp";
            form.keepExtensions = true;
            form.on ('file', function(name, file){
                if (file.name){
                    fs.rename(file.path, "./public/img/companies/" + file.name, function(err){
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
                company.title = fields.title;
                if (files.picture.name) company.logo = files.picture.name;
                company.shortDescription =  fields.shortDescription;
                company.year =  fields.year;
                company.urAddress = fields.urAddress;
                company.factAddress = fields.factAddress;
                company.phone = fields.phone;
                company.email = fields.email;
                company.website = fields.website;
                company.director = fields.director;
                company.accountant = fields.accountant;
                company.inn = fields.inn;
                company.okved = fields.okved;
                company.fullDescription = fields.fullDescription;
                company.save(function (err) {
                    if (err) throw err;
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                });
            });
        }
    });
};

exports.deleteCompany = function(req, res){
    Company.findById(req.params.id, function (err, company) {
        if (err) throw err;
        if(!company) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            company.remove(function (err) {
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

exports.addCompanyPage = function(req, res){
    res.render('companies/addCompany');
};
