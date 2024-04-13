// index.js
const express = require('express');
const indexRoute = require('./routes/indexRoute');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use indexRoute for the homepage
app.use('/', indexRoute);

// Use userRoutes for sign-in and sign-up
app.use('/user', userRoutes); // Use '/user' as the base path for user routes


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
