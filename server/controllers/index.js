let express = require('express');
const passport = require('passport');
let router = express.Router();
// CREATE THE USER MODEL INSTANCE
let UserModel = require('../models/user');
let User = UserModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title:'Home', username:req.user?req.user.username:""});
};

module.exports.displayAboutPage= (req, res, next) => {
    res.render('about', {title:'About', username:req.user?req.user.username:""});
};

module.exports.displayProductPage= (req, res, next) => {
    res.render('Projects', {title:'Product', username:req.user?req.user.username:""});
};

module.exports.displayServicesPage= (req, res, next) => {
    res.render('services', {title:'Services', username:req.user?req.user.username:""});
};

module.exports.displayContactPage= (req, res, next) => {
    res.render('contact', {title:'Contact', username:req.user?req.user.username:""});
};


module.exports.displayLoginPage= (req, res, next) => {
    // CHECK IF USER IS ALREADY LOGGED IN
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title:'Login', 
            message: req.flash('loginMessage'), 
            username:req.user?req.user.username:''
        });
    }
    else
    {
        return res.redirect('/');
    }
};

module.exports.processLoginPage= (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // SERVER ERROR
        if(err)
        {
            return next(err);
        }
        // IS THERE A USER LOGIN ERROR?
        if(!user)
        {
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // SERVER ERROR?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/businessContact');
        });
    })(req, res, next);
};

module.exports.performLogout = (req, res, next) => {
    req.logout(function (err){
        if(err)
        {
            return next(err);
            
        }
        res.redirect('/');
    });
};