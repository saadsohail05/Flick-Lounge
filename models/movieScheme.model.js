const {Schema,model}=require('mongoose')
// Define Movie Schema
const movieSchema = new Schema({
    name: String,
    poster_url: String,
    year: Number,
    ratingValue: String,
    genre: String,
    runtime: String,
    summary_text: String
});
const Movie = model('Movie', movieSchema);
module.exports = Movie;
    