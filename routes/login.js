var express = require('express');
var User = require('../models/user').User;
var formidable = require('formidable');

exports.get = function(req, res){
    res.render('login');
};

exports.post = function(req, res, next){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields, files) {
        var username = fields.login;
        var password = fields.password;
        User.authtorize(username, password, function(err, user){
            switch (err){
                case '404':
                    res.send(404,'User not found');
                    break;
                case '403':
                    res.send(403,'Incorrect password');
                    break;
                default:
                    req.session.user = user._id;
                    res.send(user);
                    break;
            }
        })

    });
};