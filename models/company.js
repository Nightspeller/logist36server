var mongoose = require('../libs/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({ title:  String,
    logo: String,
    shortDescription:  String,
    year:  String,
    urAddress: String,
    factAddress: String,
    phone: String,
    email: String,
    website: String,
    director: String,
    accountant: String,
    inn: String,
    okved: String,
    fullDescription: String
});

exports.Company = mongoose.model('company', schema);