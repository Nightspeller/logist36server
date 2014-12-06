var News = require('../models/news').News;
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

exports.getAllNews = function(req, res){
    if (req.query.newsID) {
        News.find({_id: req.query.newsID}, function(err, news){
            if(err) throw err;
            res.render('news/single-news', news[0]);
        });
    } else {
        News.find({}, function(err, news){
            if(err) throw err;
            news.reverse();
            news.sort(function(a,b){
                if (!a.index){
                    return 1;
                } else {
                    if(!b.index){
                        return -1;
                    } else {
                        return b.index - a.index;
                    }
                }
            });
            res.render('news/newsList', {allNews: news});
        });
    }
};

exports.getAllNewsJSON = function(req, res){
    News.find({}, function(err, news){
        if(err) throw err;
        res.send(news);
    });
};

exports.addNews = function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.on ('file', function(name, file){
        if (file.name){
            fs.rename(file.path, "./public/img/news/" + file.name, function(err){
                if(err) throw err;
            });
        } else {
            fs.unlink(file.path, function(err){
                if(err) throw err;
            });
        }
    });
    form.parse(req, function(err, fields, files) {
        var newNews = new News({ title:  fields.title,
            logo: files.picture.name,
            shortDescription:  fields.shortDescription,
            description:  fields.description,
            fullText:  fields.fullText,
            link: 'news.html',
            date:  fields.date,
            index:  fields.index });
        newNews.save(function (err) {
            if (err) throw err;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    });
};

exports.getNews = function(req, res){
    News.findById(req.params.id, function (err, event) {
        if (err) throw err;
        res.send(event);
    });
};

exports.updateNews = function(req, res){
    News.findById(req.params.id, function (err, news) {
        if(err) throw err;
        if(!news) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir = "./temp";
            form.keepExtensions = true;
            form.on ('file', function(name, file){
                if (file.name){
                    fs.rename(file.path, "./public/img/news/" + file.name, function(err){
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
                news.title = fields.title;
                if (files.picture.name) news.logo = files.picture.name;
                news.shortDescription = fields.shortDescription;
                news.description = fields.description;
                news.fullText = fields.fullText;
                news.link = 'events.html';
                news.date = fields.date;
                news.index = fields.index;
                news.save(function (err) {
                    if (err) throw err;
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                });
            });
        }
    });
};

exports.deleteNews = function(req, res){
    News.findById(req.params.id, function (err, news) {
        if(err) throw err;
        if(!news) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            news.remove(function (err) {
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

exports.addNewsPage = function(req, res){
    res.render('news/addNews');
};