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
    // Respond with a success message
    // res.status(201).json({ message: 'User created successfully' });
    console.log('User created successfully')
    res.redirect('/');
   
  } catch (error) {
    // Handle any errors that occur during sign-up
    console.error('Error in sign-up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};
exports.signin = async (req, res) => {
    try {
      // Extract email and password from request body
      const { email, password } = req.body;
  
      // Find the user by email in the database
      const user = await UserCredentials.findOne({ email });
  
      // Check if user exists
      if (!user) {
        // Render the signin view with an error message
        return res.render('user/signin', { error: "That Email Address doesn't exist" });
      }
  
      // Check if the provided password matches the user's password
      if (user.password !== password) {
        // Render the signin view with an error message
        return res.render('user/signin', { error: 'Invalid Password' });
      }
  
      // Password is correct, sign in successful
      res.status(200).json({ message: 'Sign-in successful', userId: user._id });
    } catch (error) {
      // Handle any errors that occur during sign-in
      console.error('Error in sign-in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };