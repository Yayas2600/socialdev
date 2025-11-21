//Passo 3:Portal SocialDEV
//  Composição:
//             -Informações do voluntário
//             -Informaçõees da Família
//             -Opção de cancelamento da Família
// INSPIRAÇÃO:https://www.ideo.com/


// PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // espera 3s antes do fade
  setTimeout(() => {
    preloader.classList.add("fade-out");

    //libera o scroll
    document.body.classList.remove("no-scroll");

    // espera o tempo da animação (2s)
    setTimeout(() => {
      preloader.style.display = "none";
    }, 2000);

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

//Programando botão login
function login() {
  location.href = "login.html";
}

const loginBtn = document.getElementById('loginBtn');

// Verifica se existe um usuário logado
const usuarioLogado = localStorage.getItem("usuarioAtual");

if (usuarioLogado) {
  if (loginBtn) loginBtn.style.display = "none";
}

if (!usuarioLogado) {
  if (loginBtn) loginBtn.style.display = "";
}

//Programando botão logout para o usuário
const logoutBtn = document.getElementById("logoutBtn");

if (!usuarioLogado) {
  if (logoutBtn) logoutBtn.style.display = "none";
}

if (logoutBtn && usuarioLogado) {
  logoutBtn.addEventListener("click", () => {
    // Confirma com o usuário
    if (confirm("Deseja realmente sair?")) {
      // Remove o usuário atual do localStorage
      localStorage.removeItem("usuarioAtual");

      // Redireciona para o portal/login
      window.location.href = "portal.html"; // altere o nome da sua página de login
    }
  });
}

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

//estilizando scroll das sections
const elements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
});

elements.forEach(el => observer.observe(el));

//estilizando scrolly projeto imagens
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".projetos");
  const slides = document.querySelector(".slides");
  const slideEls = Array.from(document.querySelectorAll(".slide"));
  const slideCount = slideEls.length;

  if (!section || !slides || slideCount === 0) return;

  // 1) Garantir que o container .slides tenha largura correta
  //    (cada slide ocupa 100vw => total = slideCount * 100vw)
  slides.style.width = `${slideCount * 100}vw`;

  // 2) Certificar cada slide como 100vw (defesa caso CSS não tenha sido carregado)
  slideEls.forEach(slide => {
    slide.style.minWidth = "100vw";
    slide.style.flex = "0 0 100vw";
  });

  // 3) Recalcula posições em resize
  let sectionTop = section.offsetTop;
  let sectionHeight = section.offsetHeight;
  function updateMetrics() {
    sectionTop = section.offsetTop;
    sectionHeight = section.offsetHeight;
  }
  window.addEventListener("resize", updateMetrics);

  // controle de posição
  let rafId = null;
  let currentTranslate = 0;
  let isDragging = false;
  let startX = 0;
  let startTranslate = 0;

  // scroll vertical → horizontal
  function onScrollFrame() {
    if (isDragging) return; // não mexer durante drag
    const scrollY = window.scrollY;

    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight - window.innerHeight) {
      let progress = (scrollY - sectionTop) / (sectionHeight - window.innerHeight);
      progress = Math.max(0, Math.min(1, progress));
      currentTranslate = -progress * (slideCount - 1) * 100;
      slides.style.transform = `translateX(${currentTranslate}vw)`;
    } else if (scrollY < sectionTop) {
      currentTranslate = 0;
      slides.style.transform = `translateX(0)`;
    } else {
      currentTranslate = -(slideCount - 1) * 100;
      slides.style.transform = `translateX(${currentTranslate}vw)`;
    }
    // durante o scroll normal → esconder tudo
    leftArrow.style.opacity = "0";
    rightArrow.style.opacity = "0";
  }

  function onScroll() {
    if (!rafId) rafId = requestAnimationFrame(() => {
      onScrollFrame();
      rafId = null;
    });

  }
  window.addEventListener("scroll", onScroll, { passive: true });
  // --- Drag horizontal ---

  slides.addEventListener("mousedown", startDrag);
  slides.addEventListener("touchstart", startDrag, { passive: false });

  slideEls.forEach(slide => {
    const imgs = slide.querySelectorAll("img");
    imgs.forEach(img => {
      img.setAttribute("draggable", "false");
      img.addEventListener("dragstart", (ev) => ev.preventDefault());
      // evita seleção enquanto arrasta
      img.style.userSelect = "none";
      img.style.webkitUserDrag = "none";
    });
  });

  function startDrag(e) {
    isDragging = true;
    slides.classList.add("dragging");
    startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    startTranslate = currentTranslate;

    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", onDrag, { passive: false });
    window.addEventListener("touchend", endDrag);
  }

  // criar setas temporárias (colocadas dentro da section correta)
  const leftArrow = document.createElement("div");
  const rightArrow = document.createElement("div");

  leftArrow.className = "scroll-arrow arrow-left";
  rightArrow.className = "scroll-arrow arrow-right";

  leftArrow.innerHTML = "&#10094;";  // ‹
  rightArrow.innerHTML = "&#10095;"; // ›

  leftArrow.style.left = "12px";
  rightArrow.style.right = "12px";

  // anexar ao elemento section (já definido)
  section.appendChild(leftArrow);
  section.appendChild(rightArrow);
  function preventScroll(e) {
    if (isDragging) e.preventDefault();
  }

  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });

  function onDrag(e) {
    if (!isDragging) return;
    const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    const delta = ((clientX - startX) / window.innerWidth) * 100; // vw
    currentTranslate = startTranslate + delta;
    currentTranslate = Math.max(-(slideCount - 1) * 100, Math.min(0, currentTranslate));
    slides.style.transform = `translateX(${currentTranslate}vw)`;

    // seta temporária
    if (delta > 0) { // movendo para a direita
      leftArrow.style.opacity = "1";
      rightArrow.style.opacity = "0";
    } else if (delta < 0) { // movendo para a esquerda
      leftArrow.style.opacity = "0";
      rightArrow.style.opacity = "1";
    } else {
      leftArrow.style.opacity = "0";
      rightArrow.style.opacity = "0";
    }

    e.preventDefault();
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    slides.classList.remove("dragging");

    leftArrow.style.opacity = "0";
    rightArrow.style.opacity = "0";

    // Travinha: centraliza no slide mais próximo
    const nearestIndex = Math.round(Math.abs(currentTranslate / 100));
    currentTranslate = -nearestIndex * 100;
    slides.style.transition = "transform 0.3s ease";
    slides.style.transform = `translateX(${currentTranslate}vw)`;
    setTimeout(() => slides.style.transition = "", 300);

    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", endDrag);
    window.removeEventListener("touchmove", onDrag);
    window.removeEventListener("touchend", endDrag);
  }
  // Atualiza altura e top da seção ao redimensionar
  window.addEventListener("resize", () => {
    // força atualização ao resize
    onScrollFrame();
  });
  
});



