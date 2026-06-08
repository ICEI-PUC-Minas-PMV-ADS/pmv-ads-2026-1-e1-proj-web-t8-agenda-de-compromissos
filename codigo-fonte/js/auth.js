document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById('auth-form');
    const toggleAuth = document.getElementById('toggle-auth');
    
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('username').value.trim();
            const pass = document.getElementById('password').value;
            const users = storage.getUsers();
            const storedUserData = users[user];
            const storedPassword = storedUserData && typeof storedUserData === 'object' ? storedUserData.password : storedUserData;

            if (storedUserData && storedPassword === pass) {
                localStorage.setItem('agenda_current_user', user);
                window.location.href = './codigo-fonte/html/home.html';
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('username').value.trim();
            const pass = document.getElementById('password').value;
            const users = storage.getUsers();

            if (users[user]) {
                alert('Este usuário já existe!');
                return;
            }

            users[user] = {
                password: pass,
                fullName: document.getElementById('user-fullname').value.trim(),
                email: document.getElementById('user-email').value.trim(),
                birthdate: document.getElementById('user-birthdate').value,
                createdAt: new Date().toISOString()
            };
            
            storage.saveUsers(users);
            alert('Cadastro realizado com sucesso! Faça seu login.');
            window.location.href = '../../index.html';
        });
    }
});