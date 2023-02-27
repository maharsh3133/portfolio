let express = require('express');
let router = express.Router();
let indexController = require('../controllers/index.js');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

router.get('/about', indexController.displayAboutPage);

router.get('/projects', indexController.displayProductPage);

router.get('/services', indexController.displayServicesPage);

router.get('/contact', indexController.displayContactPage);

// GET ROUTER FOR DISPLAYING THE LOGIN PAGE
router.get('/login', indexController.displayLoginPage);

// POST ROUTER FOR PROCESSING THE LOGIN PAGE
router.post('/login', indexController.processLoginPage);

// GET TO PERFORM USER LOGOUT
router.get('/logout', indexController.performLogout);

module.exports = router;
