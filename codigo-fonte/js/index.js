const formLogin = document.getElementById('formLogin');

// evento de envio

formLogin.addEventListener('submit', function(event){
    event.preventDefault();
const email = document.getElementById('loginEmail').value;
const senha = document.getElementById('loginSenha').value;

// Pegando Usuários Cadastrados

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Procurando Usuário
const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

// Verificar Login
if(usuarioEncontrado){
    //Salvando Usuário Logado
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
    //Redirecionamento após dois Segundos
    setTimeout(() => {
        window.location.href = '../html/home.html';
    }, 2000);
    
}else {
    document.getElementById('mensagemLogin').innerHTML = 'Email ou Senha Incorretos';
    document.getElementById('mensagemLogin').style.color = 'red';
}

});
