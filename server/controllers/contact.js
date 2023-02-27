let express = require('express');
let router = express.Router();

// CREATE A REFERENCE TO THE DB SCHEMA WHICH IS THE MODEL 
let Contact = require('../models/contacts');

// WE WANT TO DISPLAT THE BOOK LIST
module.exports.displayContactList = (req, res, next) => {
    console.log("CONTACT LIST");
    
    Contact.find((err, contactList) => {
        if(err)
            return console.error(err);
        else
            res.render('contact/list',{
                title:'Contacts',
                contactList:contactList,
                username:req.user?req.user.username:""
            });
    });
};

module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add', {
        title:'Add Contact', 
        username:req.user?req.user.username:""
    });
};

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        'name':req.body.name,
        'email':req.body.email,
        'number':req.body.number
    });
    Contact.create(newContact,(err,Contact) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.redirect('/businessContact');
        }
    });
};

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Contact.findById(id,(err,contactToEdit) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(contactToEdit);
            res.render('contact/edit' , {
                title:'Edit Contact ', 
                contact: contactToEdit,
                username:req.user?req.user.username:""
            });
        }
    });
};

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateContact = Contact({
        '_id':id,
        'name':req.body.name,
        'email':req.body.email,
        'number':req.body.number
    });

    Contact.updateOne({_id:id},updateContact,(err) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/businessContact');
        }
    });
};

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({_id:id},(err) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/businessContact');
        }
    });
};