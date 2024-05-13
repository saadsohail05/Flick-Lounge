const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', userSignedIn: false });
});

router.get('/true', (req, res) => {
    res.render('index', { title: 'Home Page', userSignedIn: true });
});
//End


module.exports = router;
