//Passo 3:Portal SocialDEV
//  Composição:
//             -Informações do voluntário
//             -Informaçõees da Família
//             -Opção de cancelamento da Família
// INSPIRAÇÃO:https://www.ideo.com/

//PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  
  //espera 3 segundos antes de começar o fade
  setTimeout(() => {
    preloader.classList.add("fade-out");
    //espera mais 2 segundos(tempo transição CSS)
    setTimeout(() => preloader.style.display = "none", 2000);
  }, 3000);
});

//header scrool
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");

  if (window.scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});


const btnCadastrarFamilia = document.querySelector("#btnCadastrarFamilia");
const btninfoFamilias = document.querySelector("#btninfoFamilias");

// Ao clicar no botão
btnCadastrarFamilia.addEventListener("click", () => {
  // Verifica novamente (segurança extra)
  const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

  if (!usuarioAtual) {
    alert("⚠️ Faça login antes de cadastrar uma família!");
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
  } else {
    // Redireciona para a página de cadastro de família
    window.location.href = "usuarioLogado.html";
  }
});

//menu header
const menuHamburguer = document.getElementById('menu-hamburguer');
const menuOpcoes = document.getElementById('menu-opcoes');

function toggleMenu(show) {
  if (show) {
    menuOpcoes.classList.add('show');
    menuOpcoes.setAttribute('aria-hidden', 'false');
    menuHamburguer.setAttribute('aria-expanded', 'true');
  } else {
    menuOpcoes.classList.remove('show');
    menuOpcoes.setAttribute('aria-hidden', 'true');
    menuHamburguer.setAttribute('aria-expanded', 'false');
  }
}

// fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!menuHamburguer.contains(e.target) && !menuOpcoes.contains(e.target)) {
    toggleMenu(false);
  }
});

// abrir menu ao clicar no botão
menuHamburguer.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu(menuOpcoes.classList.contains('show') ? false : true);
});

// teclado: ESC fecha menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleMenu(false);
});

function login() {
  location.href = "login.html";
}