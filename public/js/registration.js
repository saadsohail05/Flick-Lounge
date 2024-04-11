const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); 
       forms.classList.toggle("show-signup");
    })
})
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');



document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Login form event listener
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const loginEmail = document.getElementById('login-email').value;
            const loginPassword = document.getElementById('login-password').value;

            // Validate login form inputs
            const isLoginEmailValid = validateEmail(loginEmail);
            const isLoginPasswordValid = validatePassword(loginPassword);

            if (isLoginEmailValid && isLoginPasswordValid) {
                // Perform login form submission or other desired actions
                console.log('Login form is valid. Submitting...');
                // Add your login logic here
            } else {
                // Display error messages or perform other error handling
                console.log('Login form is invalid. Please check your inputs.');
            }
        });
    }

    // Signup form event listener
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const signupEmail = document.getElementById('signup-email').value;
            const signupPassword = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validate signup form inputs
            const isSignupEmailValid = validateEmail(signupEmail);
            const isSignupPasswordValid = validatePassword(signupPassword);
            const isConfirmPasswordValid = confirmPassword === signupPassword;

            if (isSignupEmailValid && isSignupPasswordValid && isConfirmPasswordValid) {
                // Perform signup form submission or other desired actions
                console.log('Signup form is valid. Submitting...');
                // Add your signup logic here
            } else {
                // Display error messages or perform other error handling
                console.log('Signup form is invalid. Please check your inputs.');
            }
        });
    }

    function validateEmail(email) {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        // Password validation using the provided pattern
        const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        return passwordPattern.test(password);
    }
});
