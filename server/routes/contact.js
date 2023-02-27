let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let Contact = require('../models/contacts');
let contactController = require('../controllers/contact');

// HELPER FUNCTION FOR GUARD PURPOSES
function requireAuth(req, res, next) {
    // CHECK IF USER IS LOGGED IN
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
};

// connect to our books model
//let Book = require('../models/books');
//GET ROUTE for the book list page - READ Operation
router.get('/', contactController.displayContactList);

/*GET ROUTE for displaying the Add Page - CREATE Operation*/
router.get('/add',requireAuth,contactController.displayAddPage);

/* POST Route for processing the Add Page - CREATE Operation*/
router.post('/add',requireAuth,contactController.processAddPage);

/* GET Route for displaying the Edit page- Update Operation*/

router.get('/edit/:id',requireAuth,contactController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE operation*/

router.post('/edit/:id',requireAuth,contactController.processEditPage);

/* GET to perform Deletion - DELETE Operation*/
router.get('/delete/:id',requireAuth,contactController.performDelete);

module.exports = router;
