  const UserCredentials = require('../models/userCredentials.model');
  const { sendEmail } = require('../mail/mail');
  const otpGenerator = require('otp-generator')
  const bcrypt = require('bcrypt');


 // Generate a random 6-digit OTP
  const generateOTP=()=>{
  const OTP = otpGenerator.generate(6,{ 
  upperCaseAlphabets: false,
  specialChars:false

});
return OTP;
  };

  exports.signup = async (req, res) => {
    try {
        // Extract username, email, and password from request body
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the username or email already exists in the database
        const existingUser = await UserCredentials.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.render('user/signup', { msg: 'Username or email already exists' });
        }

        // Generate OTP
        const otp = generateOTP();

        // Send OTP via email
        const subject = 'Verification OTP for FlickLounge';
        const text = `Hi ${username},\n\nYour OTP (One-Time Password) for verification is: ${otp}`;
        await sendEmail(email, subject, text);

        // Create a new user instance with hashed password and OTP
        const user = await UserCredentials.create({
            username,
            email,
            password: hashedPassword,
            otp: otp // Add the generated OTP to the user document
        });

        // Respond with a success message
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
        if (email === 'admin@admin.com' && password === 'Admin123') {
          // Render the admin page
          return res.render("Admin/adminhome");
      }
      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          // Render the signin view with an error message
          return res.render('user/signin', { error: 'Invalid Password' });
      }
      if(user)
        // Password is correct, sign in successful
        // res.status(200).cookie("token",token,option).json({ success: true, token, user});
          //signInTrueToChangeNavbar
          res.redirect('/true')

      } catch (error) {
        // Handle any errors that occur during sign-in
        console.error('Error in sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

    //for verification 

    exports.verify=(async (req, res) => {
      try {
        const { verificationCode } = req.body;
        console.log(req.body);
        console.log(verificationCode);
        // Find the user with the matching OTP
        const user = await UserCredentials.findOne({ otp: verificationCode });
        console.log(user);
        if (!user) {
          // If no user is found with the provided OTP, render the view with an error message
          return res.render('user/verifyemail', { email: user.email, error: 'Invalid verification code' });
        }
    
        // Update the user's isverified field to true and remove the OTP
        user.isverified = true;
        user.otp = null;
        await user.save();
        // Log the user object after making changes
        
        // Redirect the user to the sign-in page
        return res.render('user/signin');
      } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).render('error', { error: 'Internal server error' });
      }
    });