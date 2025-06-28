// Initialize Google Sign-In when page loads
window.onload = function() {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
        client_id: '925165189368-7t90akcm29im9hdd6kmnp4l0moiqh6ci.apps.googleusercontent.com',
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: false
    });

    // Render the Google Sign-In button
    google.accounts.id.renderButton(
        document.getElementById('googleSignInBtn'),
        {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'signin_with',
            shape: 'rectangular'
        }
    );

    // Handle regular form submission
    document.getElementById('registrationForm').addEventListener('submit', handleRegularSignUp);
};

// Handle Google Sign-In response
function handleGoogleSignIn(response) {
    try {
        // Decode the JWT token
        const responsePayload = decodeJwtResponse(response.credential);
        
        console.log('Google Sign-In successful:', responsePayload);
        
        // Extract user information
        const userInfo = {
            id: responsePayload.sub,
            email: responsePayload.email,
            name: responsePayload.name,
            picture: responsePayload.picture,
            email_verified: responsePayload.email_verified
        };
        
        // Store user info (you might want to send this to your backend)
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('authMethod', 'google');
        
        // Show success message
        showMessage('Google Sign-In successful! Redirecting...', 'success');
        
        // Redirect to home page after short delay
        setTimeout(() => {
            window.location.href = '/html/home.html';
        }, 1500);
        
    } catch (error) {
        console.error('Error handling Google Sign-In:', error);
        showMessage('Google Sign-In failed. Please try again.', 'error');
    }
}

// Handle regular email/password sign up
function handleRegularSignUp(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long.', 'error');
        return;
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just simulate a successful registration
    const userInfo = {
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        authMethod: 'email'
    };
    
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('authMethod', 'email');
    
    showMessage('Account created successfully! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = '/html/home.html';
    }, 1500);
}

// Utility function to decode JWT token
function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

// Utility function to show messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of the form
    const form = document.querySelector('.registration-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Handle sign out (for use on other pages)
function signOut() {
    google.accounts.id.disableAutoSelect();
    localStorage.removeItem('user');
    localStorage.removeItem('authMethod');
    window.location.href = '/html/registration.html';
}
