// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');

    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const formError = document.getElementById('form-error');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        let valid = true;

        // Reset error messages
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        formError.style.display = 'none';

        // Validate Username
        const usernameValue = usernameField.value.trim();
        if (!usernameValue) {
            usernameError.textContent = "Username is required";
            usernameError.style.display = 'block';
            valid = false;
        } else if (usernameValue.length < 3) {
            usernameError.textContent = "Username must be at least 3 characters";
            usernameError.style.display = 'block';
            valid = false;
        }

        // Validate Password
        const passwordValue = passwordField.value.trim();
        if (!passwordValue) {
            passwordError.textContent = "Password is required";
            passwordError.style.display = 'block';
            valid = false;
        } else if (passwordValue.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters";
            passwordError.style.display = 'block';
            valid = false;
        }

        // Final Form Submission or Error
        if (valid) {
            // Here you would handle authentication logic (for now, just an alert)
            alert("Login successful! Welcome, " + usernameValue);
            `href="login.html"`
        } else {
            formError.textContent = "Please correct the errors above.";
            formError.style.display = 'block';
        }
    });
});
