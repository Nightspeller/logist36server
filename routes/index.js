var mainPage = require('./mainPage');
var registration = require('./registration');
var events = require('./events');
var news = require('./news');
var participants = require('./participants');
var partners = require('./partners');
var companies = require('./companies');
var educations = require('./educations');
var articles = require('./articles');
var login = require('./login');
var logout = require('./logout');
var order = require('./order');
var checkAuth = require('../middleware/checkAuth');

module.exports = function(app){
   /* app.get('/', mainPage.mainPage);*/
    //restful event services
    app.get('/events', events.getAllEvents);
    app.get('/eventsJSON', events.getAllEventsJSON);
    app.post('/events',checkAuth, events.addEvent);
    app.get('/events/:id', events.getEvent);
    app.put('/events/:id',checkAuth, events.updateEvent);
    app.delete('/events/:id',checkAuth, events.deleteEvent);

    app.get('/addEvent',checkAuth, events.addEventPage);

    //restful event services
    app.get('/news', news.getAllNews);
    app.get('/newsJSON', news.getAllNewsJSON);
    app.post('/news',checkAuth, news.addNews);
    app.get('/news/:id', news.getNews);
    app.put('/news/:id',checkAuth, news.updateNews);
    app.delete('/news/:id',checkAuth, news.deleteNews);

    app.get('/addNews',checkAuth, news.addNewsPage);

    //restful participants services
    app.get('/participants', participants.getAllParticipants);
    app.get('/participantsJSON', participants.getAllParticipantsJSON);
    app.post('/participants',checkAuth, participants.addParticipant);
    app.get('/participants/:id', participants.getParticipant);
    app.put('/participants/:id',checkAuth, participants.updateParticipant);
    app.delete('/participants/:id',checkAuth, participants.deleteParticipant);

    app.get('/addParticipant',checkAuth, participants.addParticipantPage);

    //restful partners services
    app.get('/partners', partners.getAllPartners);
    app.get('/partnersJSON', partners.getAllPartnersJSON);
    app.post('/partners',checkAuth, partners.addPartner);
    app.get('/partners/:id', partners.getPartner);
    app.put('/partners/:id',checkAuth, partners.updatePartner);
    app.delete('/partners/:id',checkAuth, partners.deletePartner);

    app.get('/addPartner',checkAuth, partners.addPartnerPage);

    //restful companies services
    app.get('/companies', companies.getAllCompanies);
    app.get('/companiesJSON', companies.getAllCompaniesJSON);
    app.post('/companies',checkAuth, companies.addCompany);
    app.get('/companies/:id', companies.getCompany);
    app.put('/companies/:id',checkAuth, companies.updateCompany);
    app.delete('/companies/:id',checkAuth, companies.deleteCompany);

    app.get('/addCompany',checkAuth, companies.addCompanyPage);

    //restful educations services
    app.get('/educations', educations.getAllEducations);
    app.get('/educationsJSON', educations.getAllEducationsJSON);
    app.post('/educations',checkAuth, educations.addEducation);
    app.get('/educations/:id', educations.getEducation);
    app.put('/educations/:id',checkAuth, educations.updateEducation);
    app.delete('/educations/:id',checkAuth, educations.deleteEducation);

    app.get('/addEducation',checkAuth, educations.addEducationPage);

    //restful articles services
    app.get('/articles', articles.getAllArticles);
    app.get('/articlesJSON', articles.getAllArticlesJSON);
    app.post('/articles',checkAuth, articles.addArticle);
    app.get('/articles/:id', articles.getArticle);
    app.put('/articles/:id',checkAuth, articles.updateArticle);
    app.delete('/articles/:id',checkAuth, articles.deleteArticle);

    app.get('/addArticle',checkAuth, articles.addArticlePage);

    //login & logout
    app.get('/login', login.get);
    app.post('/login', login.post);
    app.post('/logout', logout.post);

    //order
    app.get('/order', order.orderObject(app).sendPage);
    app.post('/order', order.orderObject(app).sendFormViaEmail);

    //registration
    app.get('/registration', registration.registrationObject(app).sendPage);
    app.post('/registration', registration.registrationObject(app).sendFormViaEmail);


    //top buttons pages
    app.get('/moreAboutUs', function(req,res,nex){
        res.render('moreAboutUs');
    });
    app.get('/forYou', function(req,res,nex){
        res.render('forYou');
    });
    app.get('/council', function(req,res,nex){
        res.render('council');
    });

};