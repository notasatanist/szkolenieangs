document.addEventListener('DOMContentLoaded', () => {
    
    const modallog = document.querySelector(".login-modal");
    const btnlog = document.querySelector(".reg");
    const emailInputlog = document.getElementById('regemail');
    const switchToLogin = document.getElementById('switch-to-login');
    const switchToRegister = document.getElementById('switch-to-register');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const registerPasswordInput = document.getElementById('regpassword');

    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault(); 
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        modalTitle.textContent = 'Login';
        modalText.textContent = 'Please enter your credentials to login.';
    });

    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault(); 
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        modalTitle.textContent = 'Sign Up';
        modalText.textContent = 'Please fill in this form to create an account.';
    });
    window.addEventListener('click', function(event) {
        if (event.target === btnlog) {
            modallog.style.display = 'block';
        }
    });

    const cancelBtns = modallog.querySelectorAll('.cancelbtn');
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modallog.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modallog) {
            modallog.style.display = 'none';
        }
    });
    
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInputlog.value.trim();
        const password = registerPasswordInput.value.trim();

        if (!validateEmail(email)) {
            displayMessage("Please enter a valid email address.", "red");
            return;
        }

        if (password.length < 6) {
            displayMessage("Password must be at least 6 characters long.", "red");
            return;
        }

        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);

        displayMessage("Registration successful! Please login.", "green");

        switchToLogin.click();
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value.trim();

        const registeredEmail = localStorage.getItem('userEmail');
        const registeredPassword = localStorage.getItem('userPassword');

        if (email === registeredEmail && password === registeredPassword) {
            displayMessage("Login successful! Welcome back.", "green");
        } else {
            displayMessage("Invalid email or password. Please try again.", "red");
        }
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(String(email).toLowerCase());
    }

    function displayMessage(message, color) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.color = color;
        modallog.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
});
    