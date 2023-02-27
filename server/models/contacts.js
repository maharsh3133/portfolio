let mongoose = require('mongoose');
let contactsModel = mongoose.Schema({
    name: String,
    email: String,
    number: Number
},
{
    collection: "contacts"
});
module.exports = mongoose.model('contact',contactsModel);