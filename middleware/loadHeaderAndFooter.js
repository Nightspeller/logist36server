var User = require('../models/user').User;

module.exports = function(req,res,next){

    req.footer = res.locals.footer = null;
    req.header = res.locals.header = null;

    res.render('header', function(err, headerHtml){
        if (err) throw next(err);
        res.render('footer', function(err, footerHtml){
            if (err) throw next(err);
            res.render('topNav', function(err, topNavHtml){
                if (err) throw next(err);
                req.header = res.locals.header = headerHtml;
                req.footer = res.locals.footer = footerHtml;
                req.topNav = res.locals.topNav = topNavHtml;
                next();
            });
        });
    });

};