(function checkAuthentication() {
    const user = localStorage.getItem('agenda_current_user');
    if (!user && !window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('register_user.html')) {
        window.location.href = '../../index.html';
    }
})();