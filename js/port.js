//Passo 3:Portal SocialDEV
//  Composição:
//             -Informações do voluntário
//             -Informaçõees da Família
//             -Opção de cancelamento da Família
// INSPIRAÇÃO:https://www.ideo.com/


//função que direciona ao cadastro da Familia
function cadFamilias() {
    location.href = "cadFamilias.html";
}

// Verifica se há um usuário logado
const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

if (!usuarioAtual) {
    alert("⚠️ Você precisa fazer login para acessar o Portal.");
    window.location.href = "login.html"; // Redireciona se não estiver logado
}

const btnCadastrarFamilia = document.querySelector("#btnCadastrarFamilia");

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

// const lista = document.getElementById("listaFamilias");
// const familias = JSON.parse(localStorage.getItem("familias")) || [];

// lista.innerHTML = "";

// familias.forEach(familia => {
//     const card = document.createElement("div");
//     card.classList.add("card-familia");
//     card.innerHTML = `
//       <h3>${familia.nome}</h3>
//       <p><strong>Classe:</strong> ${familia.classe}</p>
//       <p class="cadastradoPor">Cadastrada por: ${familia.cadastradoPor}</p>
//     `;
//     lista.appendChild(card);
// });