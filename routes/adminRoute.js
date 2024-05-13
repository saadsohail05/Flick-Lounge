const express = require('express');
const router = express.Router();
const admincontroller = require('../controllers/admin.controller');

router.get('/home', (req, res) => {
    res.render('Admin/adminhome', { title: 'Admin Panel' });
});

router.get('/viewusers', async (req, res) => {
    try {
        const users = await admincontroller.getUsers();
        res.render('Admin/viewuser', { title: 'Admin Panel - View Users', users: users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/deletemovie', async (req, res) => {
    try {
        const movies = await admincontroller.getMovies();
        res.render('Admin/deletemovie', { title: 'Admin Panel - Delete Movie', movies: movies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/deletemovie/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    try {
        await admincontroller.deleteMovie(movieId);
        res.redirect('/admin/deletemovie');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/deletemoviebyname/:movieName', async (req, res) => {
    const movieName = req.params.movieName;
    try {
        await admincontroller.deleteMovieByName(movieName);
        res.redirect('/admin/deletemovie');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/deleteusers', async (req, res) => {
    try {
        const users = await admincontroller.getUsers();
        res.render('Admin/deleteusers', { title: 'Admin Panel - Delete Users', users: users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/deleteuser/:email', async (req, res) => {
    const email = req.params.email;
    try {
        await admincontroller.deleteUserByEmail(email);
        res.redirect('/admin/deleteusers');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/createmovie', (req, res) => {
    res.render('Admin/createmovies', { title: 'Admin Panel - Create Movie' });
});

router.post('/createmovie', async (req, res) => {
    const { name, poster_url, year, ratingValue, genre, summary_text } = req.body;
    try {
        // Call the function to create a new movie
        // Assuming admincontroller.createMovie(movieData) is the function to create a new movie
        await admincontroller.createMovie({ name, poster_url, year, ratingValue, genre, summary_text });
        res.redirect('/admin/createmovie');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/adminstat', async (req, res) => {
    try {
        // Get statistics from the controller
        const statistics = await admincontroller.getStatistics();
        res.render('Admin/adminstat', { title: 'Admin Panel - Statistics', totalUsers: statistics.totalUsers, totalMovies: statistics.totalMovies, averageRuntime: statistics.averageRuntime });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
