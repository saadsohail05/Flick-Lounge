const Movie = require('../models/movieScheme.model');

exports.searchMovies = async (req, res) => {
    try {
        const { keyword, genre, rating, year, page } = req.body;
        const pageSize = 10; // Number of movies per page
        const skip = (page - 1) * pageSize;

        console.log(keyword);
        console.log(genre);
        console.log(rating);
        console.log(year);
        // Construct the query object
        let query = {};
        if (keyword) query.name = keyword;
        if (genre!='all') query.genre = genre;
        if (rating!=0) query.rating = parseFloat(rating);
        if (year!=0) query.year = year;

        console.log(query);
        // Execute the query with pagination
        const movies = await Movie.find(query);

        res.json(movies);
        if (movies.length === 0) {
            console.log('No movies found.');
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.addMovie = async (req, res) => {
    try {
        const { name, poster, year, rating, genre } = req.body;
        const newMovie = new Movie({ name, poster, year, rating, genre });
        await newMovie.save();
        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};