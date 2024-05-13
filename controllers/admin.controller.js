const User = require('../models/userCredentials.model');
const Movie = require('../models/movieScheme.model');

module.exports.getUsers = async function() {
    try {
        const users = await User.find({}).exec();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports.getMovies = async function() {
    try {
        const movies = await Movie.find({}).exec();
        return movies;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports.deleteMovie = async function(movieId) {
    try {
        await Movie.findByIdAndDelete(movieId).exec();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports.deleteMovieByName = async function(movieName) {
    try {
        await Movie.findOneAndDelete({ name: movieName }).exec();
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports.deleteUserByEmail = async function(email) {
    try {
        await User.findOneAndDelete({ email: email }).exec();
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports.createMovie = async function(movieData) {
    try {
        // Assuming Movie.create(movieData) is the function to create a new movie
        await Movie.create(movieData);
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports.getStatistics = async function() {
    try {
        const totalUsers = await User.countDocuments({});
        const totalMovies = await Movie.countDocuments({});
        const averageRuntime = await Movie.aggregate([
            { $group: { _id: null, avgRuntime: { $avg: "$runtime" } } }
        ]);
        console.log(averageRuntime[0].avgRuntime);
        return {
            totalUsers: totalUsers,
            totalMovies: totalMovies,
            averageRuntime: averageRuntime[0].avgRuntime
           
            // Add more statistics as needed
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
