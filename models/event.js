var mongoose = require('../libs/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({title:  String,
    logo: String,
    shortDescription:  String,
    description:  String,
    place: String,
    link: String,
    date: String,
    index: Number
});

exports.Event = mongoose.model('event', schema);