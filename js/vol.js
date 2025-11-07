//Passo 2:Cadastro de voluntários
//  Composição:-Nome completo
//             -Idade
//             -Identidade
//             -Contatos(e-mail)
//             -Gênero
//             -Endereço/Cidade
//             -Restrições de tempo e disponibilidade(Período do dia)
//             -cadastro login e senha
//             -COLOCAR O OLHINHO PARA VER A SENHA DIGITADA
// funcionalidade: - Salvar todas as informações de usuário e colocar no portal que dê para editar e
//                  junto também os cards das familias cadastradas pelo usuário(estilo gitHub e Cartão de todos)



const form = document.querySelector("#form");
const nomeInput = document.querySelector("#name");
const idadeInput = document.querySelector("#idade");
const cpfInput = document.querySelector("#cpf");
const cpfMsg = document.getElementById('cpf-msg');
const emailInput = document.querySelector("#email");
const emailMsg = document.getElementById('email-msg');
const celularInput = document.querySelector("#celular");
const enderecoInput = document.querySelector("#endereco");
const generoInput = document.querySelector("#genero");
const diaInput = document.querySelector("#dia");
const senhaInput = document.querySelector("#senha");
const senhaMsg = document.getElementById("senha-msg");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Valida e-mail
    if (!isEmailValid(emailInput.value.trim())) {
        emailMsg.style.display = "inline";
        emailInput.style.borderColor = "red";
        emailInput.focus();
        return;
    } else {
        emailMsg.style.display = "none";
        emailInput.style.borderColor = "";
    }
    // Valida cpf
    const numerosCpf = cpfInput.value.replace(/\D/g, "");
    if (numerosCpf.length !== 11 || !validaCpf(numerosCpf)) {
        cpfMsg.style.display = "inline";
        cpfInput.style.borderColor = "red";
        cpfInput.focus();
        return;
    } else {
        cpfMsg.style.display = "none";
        cpfInput.style.borderColor = "";
    }


    //valida o cadastro
    // validando login e senha
    const user = document.querySelector("#user").value.trim();
    const senha = document.querySelector("#senha").value.trim();
    const idade = parseInt(document.querySelector("#idade").value.trim());

    // valida idade
    if (isNaN(idade) || idade < 18) {
        alert("Desculpe, você precisa ter pelo menos 18 anos para se cadastrar 🥺");
        return;
    } else if (idade > 90) {
        alert("Idade inválida. Verifique o valor informado ⚠️");
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

    // Pega lista existente
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se já existe alguém com esse nome
    const usuarioExistente = usuarios.find(u => u.usuario === user);
    if (usuarioExistente) {
        alert("Esse usuário já está cadastrado ❌");
        return;
    }

    // Cria o objeto do usuário
    const novoUsuario = {
        usuario: user,
        senha: senha,
        nome: document.querySelector("#name").value.trim(),
        idade: idade,
        email: emailInput.value.trim(),
        cpf: numerosCpf,
        endereço: enderecoInput.value.trim(),
        celular: celularInput.value.trim(),
        genero: generoInput.value.trim(),
        disponibilidadeHorário: dia.value.trim(),
        dataCadastro: new Date().toLocaleDateString("pt-BR")
    };

    // Salva no localStorage (array de usuários)
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    //usuário logado (para usar no portal depois)
    localStorage.setItem("usuarioAtual", JSON.stringify(novoUsuario));

    alert("✅ Cadastro realizado com sucesso!");
    window.location.href = "portal.html";
});

// Função que valida CPF
// Aplica máscara enquanto digita
cpfInput.addEventListener("input", () => {
    // Remove tudo que não for número
    let numeros = cpfInput.value.replace(/\D/g, "");

    // Limita a 11 dígitos
    if (numeros.length > 11) numeros = numeros.slice(0, 11);

    // Aplica máscara apenas se houver algum número
    let v = numeros;
    if (numeros.length > 3) v = v.replace(/(\d{3})(\d)/, "$1.$2");
    if (numeros.length > 6) v = v.replace(/(\d{3})(\d)/, "$1.$2");
    if (numeros.length > 9) v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    cpfInput.value = v;

    // Validação somente se tiver exatamente 11 números
    if (numeros.length === 11) {
        if (!validaCpf(numeros)) {
            cpfInput.style.borderColor = "red";
            cpfMsg.style.display = "inline";
        } else {
            cpfInput.style.borderColor = "green";
            cpfMsg.style.display = "none";

            // volta ao padrão depois de 1 segundo
            setTimeout(() => {
                cpfInput.style.borderColor = "";
            }, 1000);
        }
    } else {
        // Menos de 11 números: mantém borda padrão
        cpfInput.style.borderColor = "";
        cpfMsg.style.display = "none";
    }
});

// Validação real do CPF com 11 números
function validaCpf(cpf) {
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

// Função que valida celular
celularInput.addEventListener('input', () => {
    let v = celularInput.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1)$2");
    v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
    celularInput.value = v;
});

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

function login() {
    location.href = "login.html";
}




















