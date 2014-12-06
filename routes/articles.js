var Article = require('../models/article').Article;
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

exports.getAllArticles = function(req, res){
    if (req.query.articleID) {
        Article.find({_id: req.query.articleID}, function(err, articles){
            res.render('articles/single-article', articles[0]);
        });
    } else {
        Article.find({}, function(err, articles){
            articles.reverse();
            res.render('articles/articlesList', {allArticles: articles});
        });
    }
};

exports.getAllArticlesJSON = function(req, res){
    Article.find({}, function(err, articles){
        res.send(articles);
    });
};

exports.addArticle = function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.on ('file', function(name, file){
        if (file.name){
            fs.rename(file.path, "./public/img/articles/" + file.name, function(err){
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
        var newArticle = new Article({
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
        console.log(newArticle)
        newArticle.save(function (err) {
            if (err) throw err;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    });
};

exports.getArticle = function(req, res){
    Article.findById(req.params.id, function (err, article) {
        if (err) throw err;
        res.send(article);
    });
};

exports.updateArticle = function(req, res){
    Article.findById(req.params.id, function (err, article) {
        if (err) throw err;
        if(!article) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir = "./temp";
            form.keepExtensions = true;
            form.on ('file', function(name, file){
                if (file.name){
                    fs.rename(file.path, "./public/img/articles/" + file.name, function(err){
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
                article.title = fields.title;
                if (files.picture.name) article.logo = files.picture.name;
                article.shortDescription =  fields.shortDescription;
                article.year =  fields.year;
                article.urAddress = fields.urAddress;
                article.factAddress = fields.factAddress;
                article.stockAddress = fields.stockAddress;
                article.phone = fields.phone;
                article.email = fields.email;
                article.website = fields.website;
                article.director = fields.director;
                article.accountant = fields.accountant;
                article.inn = fields.inn;
                article.okved = fields.okved;
                article.fullDescription = fields.fullDescription;
                article.autopark = fields.autopark;
                article.stuff = fields.stuff;
                article.additionalInfo = fields.additionalInfo;
                article.contactPerson = fields.contactPerson;
                article.contactPhone = fields.contactPhone;
                article.contactEmail = fields.contactEmail;
                article.save(function (err) {
                    if (err) throw err;
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                });
            });
        }
    });
};

exports.deleteArticle = function(req, res){
    Article.findById(req.params.id, function (err, article) {
        if (err) throw err;
        if(!article) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            article.remove(function (err) {
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

exports.addArticlePage = function(req, res){
    res.render('articles/addArticle');
};
