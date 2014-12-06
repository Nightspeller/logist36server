var User = require('./models/user').User;

var newUser = new User({username: 'Alex', password: 'q1w2e3r4'});
newUser.save(function(err){
    if(err) throw err;
});

newUser = new User({username: 'Serg', password: 'q1w2e3r4'});
newUser.save(function(err){
    if(err) throw err;
});