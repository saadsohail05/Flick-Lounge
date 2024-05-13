const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/user.controller');

router.get('/signin', (req, res) => {
    res.render('User/signin', { title: 'Sign In' });
});

router.post('/signin', userController.signin);

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
router.get('/search', (req, res) => {
    res.render('User/search', { title: 'Search' });

});

router.get('/moviestats', (req, res) => {
    res.render('User/moviestats', { title: 'Your Statistics' });

});
router.get('/movielists', (req, res) => {
    res.render('User/movielist', { title: 'Your List' });

});

router.get('/admin', (req, res) => {
    res.render('User/admin', { title: 'Admin Movie' });

});

router.get('/userProfile', (req, res) => {
    res.render('User/profile', { title: 'Your Profile' });

});
router.get('/verify-email', (req, res) => {
    res.render('User/verifyemail', { title: 'Verify Email' });

});
router.post('/verify-email', userController.verify);

module.exports = router;
