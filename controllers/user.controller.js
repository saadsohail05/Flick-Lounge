const UserCredentials = require('../models/userCredentials.model');


exports.signup = async (req, res) => {
  try {
    // Extract username, email, and password from request body
    const { username, email, password } = req.body;

    // Check if the username or email already exists in the database
    const existingUser = await UserCredentials.findOne(
        { $or:[
            { username }, 
            { email }
        ] 
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Create a new user instance
   await UserCredentials.create({ username, email, password });
   res.redirect('/');

  
    // Respond with a success message
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle any errors that occur during sign-up
    console.error('Error in sign-up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};