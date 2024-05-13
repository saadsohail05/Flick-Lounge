const express = require('express');
const indexRoute = require('./routes/indexRoute');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/FlickLounge').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
    secret: 'Flicklounge', // Provide a secret key here
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 } // Adjust cookie settings as needed
}));

app.use('/', indexRoute);
app.use('/user', userRoutes);
app.use('/user', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
