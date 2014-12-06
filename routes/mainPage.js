var News = require('../models/news').News;

exports.mainPage = function(req, res){
    News.find({}, function(err, news){
        if(err) throw err;
        var newsData = [];
        var newsPicked = 0;
        while(newsPicked != 3){
            var randomNumber = Math.floor((Math.random()*news.length));
            if (newsData.indexOf(news[randomNumber]) === -1){
                newsData.push(news[randomNumber]);
                newsPicked++;
            }
        }
        res.render('index', {indexNews: newsData});
    });
};
