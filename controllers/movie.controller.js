const Movie = require('../models/movieScheme.model');

exports.searchMovies = async (req, res) => {
    try {
        const { keyword, genre, rating, year} = req.body;
        const pageSize = 10; // Number of movies per page
        const page = req.query.page-1;

        console.log(req.query);
        // Construct the query object
        let query = {};
        if (keyword!="Search") query.name = keyword;
        if (genre!='all') query.genre = genre;
        // Handle rating query
       // Handle rating query (as strings)
       if (rating && rating !== '0') {
        const numericRating = parseFloat(rating.replace('+', ''));
        query.$expr = { $gte: [{ $toDouble: "$ratingValue" }, numericRating] };
    }


        // Handle year query (as strings)
        if (year && year !== '0') {
            if (year.includes('-')) {
                const [startYear, endYear] = year.split('-').map(y => y.trim() === 'now' ? new Date().getFullYear().toString() : y.trim());
                query.year = { $gte: startYear, $lte: endYear };
            } else {
                query.year = year;
            }
        }

       
       // Execute the query to get total count of movies (for pagination)
       const totalCount = await Movie.countDocuments(query);
        
       // Execute the query with pagination
       const movies = await Movie.find(query)
                                  .select('name poster_url year ratingValue genre summary_text')
                                  .skip(page * pageSize)
                                  .limit(pageSize)
                                  .exec();
                                  
       
       // Calculate total number of pages
       const totalPages = Math.ceil(totalCount / pageSize);

       // Render the view with movies data and pagination information
       res.render('user/search', { movies, totalPages, currentPage: page });
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

exports.getLatestMovies = async (req, res) => {
    try {
      // Query the database to get the latest movies
      const latestMovies = await Movie.find().limit(5); 
      res.render('user/moviespage', { movies: latestMovies });
      
    } catch (error) {
      console.error("Error fetching latest movies:", error);
      res.status(500).send('Internal Server Error');
    }
  };
