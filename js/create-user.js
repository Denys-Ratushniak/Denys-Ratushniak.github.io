document.addEventListener('DOMContentLoaded', () => {
    const createUserButton = document.getElementById('create-user-button');

    async function createUser() {
        const formData = new FormData(document.getElementById('create-user-form'));
        const data = Object.fromEntries(Array.from(formData).filter(([, v]) => v !== ''));
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match');
        } else {
            delete data.confirmPassword;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            console.log(response);
            const response = await fetch('http://127.0.0.1:5000/user', options);
            
            const json = await response.json();
            if (json.code !== 200) {
                if (json.error.slice(2, 11) === 'birthDate') {
                    alert('Birth date should be entered earlier than current date');
                } else {
                    alert(json.error);
                }
            } else {
                alert('User successfully created');
                window.location.href = './account.html';
            }
        }
    }

    createUserButton.addEventListener('click', createUser);
});
