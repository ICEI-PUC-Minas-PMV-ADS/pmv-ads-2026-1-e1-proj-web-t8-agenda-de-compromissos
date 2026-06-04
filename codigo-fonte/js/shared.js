// --- ESTADO GLOBAL DA APLICAÇÃO ---
let state = {
    currentUser: localStorage.getItem('agenda_current_user') || null,
    currentDate: new Date(),
    currentView: 'month'
};

// --- OPERAÇÕES DO LOCALSTORAGE ---
const storage = {
    getUsers: () => JSON.parse(localStorage.getItem('agenda_users')) || {},
    saveUsers: (users) => localStorage.setItem('agenda_users', JSON.stringify(users)),
    getUserTasks: (username) => JSON.parse(localStorage.getItem(`tasks_${username}`)) || [],
    saveUserTasks: (username, tasks) => localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks))
};

// --- FUNÇÕES COMPARTILHADAS DE UI ---
function updateUserHeader() {
    const userNameEl = document.getElementById('current-user-name');
    if (!userNameEl || !state.currentUser) return;
    
    const users = storage.getUsers();
    const userData = users[state.currentUser];
    userNameEl.innerText = (userData && userData.fullName) ? userData.fullName : state.currentUser;
}

function updateTrashCount() {
    const trashCountEl = document.getElementById('trash-count');
    if (!trashCountEl || !state.currentUser) return;
    const tasks = storage.getUserTasks(state.currentUser);
    trashCountEl.innerText = tasks.filter(t => t.deleted).length;
}

function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('agenda_current_user');
            window.location.href = '../index.html';
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateUserHeader();
    updateTrashCount();
    initLogout();
});