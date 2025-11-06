//Passo 4:Cadastro de Famílias Carentes
//  Composição:-Nome completo
//             -Endereço
//             -Identidade
//             -Contatos(e-mail
//             -celular)
//             -Quantas pessoas moram na casa 
//             -Quantas são crianças
//             -Situação de trabalho
//             -Quantas pessoas trabalham na casa
//             -Quantos salários mínimos recebem no total
//             -Situação de moradia
//             -Msg de texto(Necessitam de alojamentos/Agasalhos)
// Funcionalidade: - calculo de renda per capita
//                 - Ao cadastrar a familia automaticamente é criado um card em outra página com todas as informações obtidas da mesma.
//

const form = document.querySelector("#form");
const nomeInput = document.querySelector("#name");
const enderecoInput = document.querySelector("#endereco");
const cpfInput = document.querySelector("#cpf");
const cpfMsg = document.getElementById('cpf-msg');
const emailInput = document.querySelector("#email");
const emailMsg = document.getElementById('email-msg');
const celularInput = document.querySelector("#celular");
const crianInput = document.querySelector("#crian");
const situInput = document.querySelector("#situ");
const trabInput = document.querySelector("#trab");
const moradiaInput = document.querySelector("#moradia");
const imsgInput = document.querySelector("#imsg");

// Verifica se há usuário logado
const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

if (!usuarioAtual) {
    alert("⚠️ Por favor, faça login para acessar esta página.");
    window.location.href = "login.html";
}

const usuarioAtualNome = usuarioAtual?.usuario || "Usuário";

const nomeUsuarioEl = document.querySelector("#nomeUsuario");
if (nomeUsuarioEl) {
    nomeUsuarioEl.textContent = `Bem-vindo(a), ${usuarioAtualNome}! 👋`;
}

//se todos os campos estiverem preenchidos
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

    //campo mensagem
    let mensagem = imsgInput.value.trim();
    if (mensagem === ""){
        mensagem = "nenhuma informação";
    }

    // Valida cadastro da família
    const cpf = cpfInput.value.trim();


    const totalPessoas = parseInt(document.querySelector("#pessoas").value);
    const totalSalarios = parseFloat(document.querySelector("#salarios").value);

    // Validação de valores numéricos
    if (isNaN(totalPessoas) || totalPessoas <= 0) {
        alert("Informe corretamente o número de pessoas na família.");
        return;
    }

    if (isNaN(totalSalarios) || totalSalarios < 0) {
        alert("Informe corretamente o total de salários da família.");
        return;
    }

    // Verifica se há cadastros anteriores
    let familias = JSON.parse(localStorage.getItem("familias")) || [];

    // Verifica se CPF já está cadastrado
    const familiaExistente = familias.find(f => f.cpf === cpf);
    if (familiaExistente) {
        alert("⚠️ Essa família já está cadastrada!");
        return;
    }


    // Calcula a classificação da família
    const classificacao = classificarFamilia(totalPessoas, totalSalarios);

    // Se for classe média ou alta, impede o cadastro
    if (classificacao === "Classe média baixa" ||
        classificacao === "Classe média" ||
        classificacao === "Classe média alta" ||
        classificacao === "Classe alta") {
        alert("Cadastro não aprovado. Apenas famílias de baixa renda podem ser registradas.");
        return;
    }

    const familia = {
        nome: document.querySelector("#name").value.trim(),
        endereço: enderecoInput.value.trim(),
        cpf: cpfInput.value.trim(),
        email: emailInput.value.trim(),
        celular: celularInput.value.trim(),
        pessoas: totalPessoas,
        crianças: crianInput.value.trim(),
        SituaçãoTrabalho: situInput.value.trim(),
        QuantosTrabalham: trabInput.value.trim(),
        salarios: totalSalarios,
        SituaçãoMoradia: moradiaInput.value.trim(),
        mensagem: mensagem,
        classe: classificacao,
        cadastradoPor: usuarioAtual.usuario // adiciona o nome do usuário logado
    };

    // Salva no localStorage
    // Adiciona ao array existente
    familias.push(familia);
    localStorage.setItem("familias", JSON.stringify(familias));

    alert(`Cadastro realizado com sucesso! 🏡`);
    window.location.href = "Portal.html";
});

function classificarFamilia(totalPessoas, totalSalarios, salarioMinimo = 1518) {
    // salarioMínimo: valor atual do salário mínimo (ano 2025 = R$1518)

    // Calcula a renda total e a renda per capita
    const rendaTotal = totalSalarios * salarioMinimo;
    const rendaPerCapita = rendaTotal / totalPessoas;

    let classeRenda;

    // Classificação baseada em faixas do IBGE/FGV
    if (rendaPerCapita <= 0.5 * salarioMinimo) {
        classeRenda = "Extrema pobreza";
    }
    else if (rendaPerCapita <= salarioMinimo) {
        classeRenda = "Baixa renda";
    }
    else if (rendaPerCapita <= 2 * salarioMinimo) {
        classeRenda = "Classe média baixa";
    }
    else if (rendaPerCapita <= 4 * salarioMinimo) {
        classeRenda = "Classe média";
    }
    else if (rendaPerCapita <= 10 * salarioMinimo) {
        classeRenda = "Classe média alta";
    }
    else {
        classeRenda = "Classe alta";
    }

    return classeRenda;
}

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
//função que volta no login
function Portal() {
    location.href = "Portal.html";
}
