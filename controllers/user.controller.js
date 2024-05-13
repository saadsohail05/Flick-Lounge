  const UserCredentials = require('../models/userCredentials.model');
  const { sendEmail } = require('../mail/mail');
  const otpGenerator = require('otp-generator')
  const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');


 // Generate a random 6-digit OTP
  const generateOTP=()=>{
  const OTP = otpGenerator.generate(6,{
  upperCaseAlphabets: false,
  specialChars:false

});
return OTP;
  };

// Signup a new user
  exports.signup = async (req, res) => {
    try {
      // Extract username, email, and password from request body
      const { username, email, password } = req.body;
      // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
      // Check if the username or email already exists in the database
      const existingUser = await UserCredentials.findOne(
          { $or:[
              { username }, 
              { email }
          ] 
      });
      if (existingUser) {
          return res.render('user/signup', { msg: 'Username or email already exists' });
      }
     // Create a new user instance
     const user = await UserCredentials.create({ username, email, password: hashedPassword });
      // Respond with a success message
      // res.status(201).json({ message: 'User created successfully' });
    
    // Generate OTP
    const otp = generateOTP();

    // Send OTP via email
    const subject = 'Verification OTP for FlickLounge';
    const text = `Hi ${username},\n\nYour OTP (One-Time Password) for verification is: ${otp}`;
    await sendEmail(email, subject, text);
    res.render('user/verifyemail', { email });


    
    } catch (error) {
      // Handle any errors that occur during sign-up
      console.error('Error in sign-up:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
  };
  // Signin a user
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
      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          // Render the signin view with an error message
          return res.render('user/signin', { error: 'Invalid Password' });
      }
        // Password is correct, sign in successful
        // res.status(200).json({ message: 'Sign-in successful', userId: user._id }); 
        res.redirect('/')
      } catch (error) {
        // Handle any errors that occur during sign-in
        console.error('Error in sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };