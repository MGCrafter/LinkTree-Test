document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        try {
            const response = await fetch('https://directus-1.nekozdevteam.eu/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('directusToken', data.data.access_token);
                window.location.href = 'admin.html';
            } else {
                throw new Error(data.errors[0].message);
            }
        } catch (error) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = error.message;
        }
    });
});
