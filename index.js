const express = require('express');
const indexRoute = require('./routes/indexRoute');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/FlickLounge').then(() => {console.log('Connected to MongoDB')});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
