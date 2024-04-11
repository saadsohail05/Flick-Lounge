function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const loginEmail = document.getElementById('login-email').value;
            const passwordMatchError = document.getElementById('password-match-error');

            // Validate login form inputs
            const isLoginEmailValid = validateEmail(loginEmail);

            if (isLoginEmailValid) {
                // Perform form submission or other desired actions
                console.log('Email is valid. Submitting...');
            } else {
                console.log('Email is invalid. Please enter a valid email address.');
            }
        });
    }
});
