//Passo 3:Portal SocialDEV
//  Composição:
//             -Informações do voluntário
//             -Informaçõees da Família
//             -Opção de cancelamento da Família
// INSPIRAÇÃO:https://www.ideo.com/


const btnCadastrarFamilia = document.querySelector("#btnCadastrarFamilia");
const btninfoFamilias= document.querySelector("#btninfoFamilias");

// Ao clicar no botão
btnCadastrarFamilia.addEventListener("click", () => {
    // Verifica novamente (segurança extra)
    const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

    if (!usuarioAtual) {
        alert("⚠️ Faça login antes de cadastrar uma família!");
        window.location.href = "login.html";
    } else {
        // Redireciona para a página de cadastro de família
        window.location.href = "cadFamilias.html";
    }
});

// Ao clicar no botão
btninfoFamilias.addEventListener("click", () => {
    // Verifica novamente (segurança extra)
    const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

    if (!usuarioAtual) {
        alert("⚠️ Faça login antes de acessar informações restritas!");
        window.location.href = "login.html";
    } else {
        // Redireciona para a página de cadastro de família
        window.location.href = "usuarioLogado.html";
    }
});
