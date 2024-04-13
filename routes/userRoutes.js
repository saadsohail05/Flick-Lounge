const express = require('express');
const router = express.Router();
const path = require('path');
const formController = require('../controllers/formController');

router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/User/signin.html')); // Render the sign-in form
});

// // Route for handling sign-in form submission
// router.post('/signin', (req, res) => {
//     // Process sign-in form submission
//     // Logic for authenticating the user
// });

// Route for displaying the sign-up form
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/User/signup.html')); // Render the sign-up form
});

// Route for handling sign-up form submission
// router.post('/signup', (req, res) => {
//     // Process sign-up form submission
//     // Logic for creating a new user account
// });
router.get('/request-password-reset', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/User/forgot.html')); // Render the sign-in form
});


module.exports = router;
