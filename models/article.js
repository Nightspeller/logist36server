var mongoose = require('../libs/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({ title:  String,
    logo: String,
    shortDescription:  String,
    fullDescription:  String
});

exports.Article = mongoose.model('article', schema);