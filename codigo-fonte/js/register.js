const form = document.getElementById('cadastroUser');

//evento de envio de formulario 
form.addEventListener('submit', function(event){
//evita recarregar a pagina
event.preventDefault();
//pegando os valores dos campos
const nome = document.getElementById('nome').value;
const email = document.getElementById('email').value;
const dataN = document.getElementById('dataN').value;
const tel = document.getElementById('tel').value;
const senha = document.getElementById('senha').value;

//criando objeto usuario
const usuario = {
    nome,
    email,
    dataN,
    tel,
    senha
};

//pegando usuario ja cadastrado
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

//verificando se o email ja existe
const emailExiste = usuarios.some(user => user.email === email);

if(emailExiste) {
    document.getElementById('mensagem').innerHTML = 'email ja cadastrado';
    document.getElementById('mensagem').style.color = 'red';
return;
}

//adicionar novo usuario
usuarios.push(usuario);

//salvando no localStorage
localStorage.setItem('usuarios', JSON.stringify(usuarios));

//mensagem de sucesso
document.getElementById('mensagems').innerHTML = 'cadastro realizado com sucesso';
document.getElementById('mensagems').style.color = 'green';

//limpar formulario
form.reset(); 

});