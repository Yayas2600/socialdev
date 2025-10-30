//Passos para criação do programa
//Passo 1:Login dos voluntários
//  Composição:-campo_Login
//             -campo_Senha
//             -botão_Entrar
//             -botão_CadastrarVoluntário(passo2)
//Ao Enviar as informações de login, se estiver cadastrado
//             -Direcionar a página do passo 3


const form = document.querySelector("#form");
const userInput = document.querySelector("#user");
const senhaInput = document.querySelector("#senha");
const senhaMsg = document.getElementById("senha-msg");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // impede o envio automático

    const user = document.querySelector("#user").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    if (user === "" || senha === "") {
        alert("Por favor, preencha usuário e senha ⚠️");
        return;
    }

    // Valida se a senha tem exatamente 5 caracteres
    if (senha.length !== 5) {
        senhaMsg.style.display = "inline";
        senhaInput.style.borderColor = "red";
        senhaInput.focus();
        return;
    } else {
        senhaMsg.style.display = "none";
        senhaInput.style.borderColor = "";
    }

    // Pega a lista de usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
        u => u.usuario === user && u.senha === senha
    );

    if (!usuarioEncontrado) {
        alert("Usuário ou senha incorretos ❌");
        return;
    }

    // Salva usuário logado
    localStorage.setItem("usuarioAtual", JSON.stringify(usuarioEncontrado));
    window.location.href = "Portal.html";
});

function mostrarSenha() {
    let inputPass = document.getElementById('senha')
    let btnShowPass = document.getElementById('btn-senha')

    if (inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text')
        btnShowPass.classList.replace('bi-eye', 'bi-eye-slash')
    } else {
        inputPass.setAttribute('type', 'password')
        btnShowPass.classList.replace('bi-eye-slash', 'bi-eye')
    }
}

//Para o usuário ser direcionado para pág de cadastro
function cadastro() {
    location.href = "cadVoluntario.html";
}




