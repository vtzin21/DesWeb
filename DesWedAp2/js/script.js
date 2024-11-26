document.addEventListener("DOMContentLoaded", function() {
    checkAuthentication();
});


function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('authenticated');
    const currentPage = window.location.pathname;

    if (!isAuthenticated && currentPage != '/login.html') {
        // Se não estiver autenticado e não estiver na página de login, redirecionar para a página de login
        window.location.href = 'login.html';
    }
}

window.addEventListener('beforeunload', function (e) {
    const isAuthenticated = localStorage.getItem('authenticated');
    const currentPage = window.location.pathname;

    if (!isAuthenticated && currentPage !== 'login.html') {
        // Se não estiver autenticado e não estiver na página de login, exibe uma mensagem personalizada
        const message = 'Você não está autenticado. As alterações não serão salvas.';
        e.returnValue = message;
        return message;
    }
});

function logout() {
    // Lógica de logout (pode ser mais elaborada dependendo da autenticação)
    localStorage.setItem('authenticated', 'false');
    alert('Logout realizado com sucesso');
    window.location.href = 'login.html';  // Redireciona para a página inicial após o logout
}