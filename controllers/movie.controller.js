const Movie = require('../models/movieScheme.model');

exports.searchMovies = async (req, res) => {
    try {
        const { keyword, type, genre, rating, page } = req.body;
        const pageSize = 10; // Number of movies per page
        const skip = (page - 1) * pageSize;

        // Query MongoDB based on search criteria, pagination, and limit
        const movies = await Movie.find({
            name: { $regex: new RegExp(keyword, 'i') },
            genre: genre !== 'All' ? genre : { $exists: true },
            rating: { $gte: parseInt(rating) }
        }).skip(skip).limit(pageSize);

        res.json(movies);
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