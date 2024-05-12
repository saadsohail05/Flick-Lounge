const {Schema,model}=require('mongoose')
// Define Movie Schema
const movieSchema = new Schema({
    name: String,
    poster: String,
    year: Number,
    rating: Number,
    genre: String
});
const Movie = model('Movie', movieSchema);
module.exports=Movie;