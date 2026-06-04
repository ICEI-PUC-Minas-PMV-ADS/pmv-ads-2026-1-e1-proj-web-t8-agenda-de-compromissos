document.addEventListener("DOMContentLoaded", () => {
    const users = storage.getUsers();
    const userData = users[state.currentUser];
    if (!userData) return;

    document.getElementById('profile-username').value = state.currentUser;
    document.getElementById('profile-fullname').value = userData.fullName || '';
    document.getElementById('profile-email').value = userData.email || '';
    document.getElementById('profile-birthdate').value = userData.birthdate || '';

    document.getElementById('profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        userData.fullName = document.getElementById('profile-fullname').value.trim();
        userData.email = document.getElementById('profile-email').value.trim();
        userData.birthdate = document.getElementById('profile-birthdate').value;

        const newPass = document.getElementById('profile-password').value;
        if (newPass && newPass.trim() !== '') userData.password = newPass;

        users[state.currentUser] = userData;
        storage.saveUsers(users);
        alert('Perfil atualizado com sucesso!');
        window.location.href = 'dashboard.html';
    });
});