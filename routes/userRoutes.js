const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/user.controller');

router.get('/signin', (req, res) => {
    res.render('User/signin', { title: 'Sign In' });
});

// router.post('/signin', userController.submit_form_data);

router.get('/signup', (req, res) => {
    res.render('User/signup', { title: 'Sign Up' });
});

router.post('/signup', userController.signup);

router.get('/request-password-reset', (req, res) => {
    res.render('User/forgot', { title: 'Forgot Password' });
});
router.get('/movies', (req, res) => {
    res.render('User/moviespage', { title: 'Movies' });

});
module.exports = router;
