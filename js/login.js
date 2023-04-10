document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    async function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const credentials = `${username}:${password}`;
        const encodedCredentials = btoa(credentials);
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${encodedCredentials}`,
            },
        };
        try {
            const response = await fetch('http://127.0.0.1:5000/user_login', options);
            const json = await response.json();
            sessionStorage.setItem('Authorization', `Basic ${encodedCredentials}`);
            alert(json.message);
            window.location.href = './account.html';
        } catch (error) {
            alert('Invalid username or password');
        }
    }
    loginButton.addEventListener('click', login);
});
