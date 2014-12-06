var mongoose = require('../libs/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({ title:  String,
    logo: String,
    shortDescription:  String,
    year:  String,
    urAddress: String,
    factAddress: String,
    stockAddress: String,
    phone: String,
    email: String,
    website: String,
    director: String,
    accountant: String,
    inn: String,
    okved: String,
    fullDescription: String,
    autopark: String,
    stuff: String,
    additionalInfo: String,
    contactPerson: String,
    contactPhone: String,
    contactEmail: String
});

exports.Participant = mongoose.model('participant', schema);