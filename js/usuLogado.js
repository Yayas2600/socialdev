window.addEventListener("DOMContentLoaded", () => {
  //Verificação de login logo no início
  const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  if (!usuarioAtual) {
    alert("Acesso negado! Faça login para continuar.");
    window.location.href = "login.html";
    return;
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
  if (!menuHamburguer.contains(e.target) && ! menuOpcoes.contains(e.target)) {
    toggleMenu(false);
  }
});

// abrir menu ao clicar no botão
menuHamburguer.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu( menuOpcoes.classList.contains('show') ? false : true);
});

// teclado: ESC fecha menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleMenu(false);
});

  //informações do usuário
  const nomeCompleto = document.getElementById('nomeCompleto');
  const nomeUsuario = document.getElementById('nomeUsuario');

  if (usuarioAtual) {
    nomeCompleto.textContent = usuarioAtual.nome || "Nome completo";
    nomeUsuario.textContent = usuarioAtual.usuario || "Usuário";
  } else {
    // se não tiver usuário logado, redireciona e mostra alert
    alert("Você precisa estar logado para acessar esta página!");
    window.location.href = "login.html";
  }

  // Exibe as info usuário
  const infoUsuario = document.getElementById("infoUsuario");

  if (!usuarioAtual) {
    // Se não houver usuário logado, redireciona para login
    window.location.href = "login.html";
    return;
  }

  // Mostra o nome e nome de usuário
  nomeCompleto.textContent = usuarioAtual.nome || "Nome Completo";
  nomeUsuario.textContent = usuarioAtual.usuario || "Usuário";

  // Cria o card com as informações
  infoUsuario.innerHTML = `
  
    <div class="card-info-usuario">
      <p><strong style="font-weight: bold">E-mail:</strong> ${usuarioAtual.email || "-"}</p>
      <p><strong style="font-weight: bold">CPF:</strong> ${usuarioAtual.cpf || "-"}</p>
      <p><strong style="font-weight: bold">Idade:</strong> ${usuarioAtual.idade || "-"}</p>
      <p><strong style="font-weight: bold">Celular:</strong> ${usuarioAtual.celular || "-"}</p>
      <p><strong style="font-weight: bold">Endereço:</strong> ${usuarioAtual.endereço || "-"}</p>
      <p><strong style="font-weight: bold">Gênero:</strong> ${usuarioAtual.genero || "-"}</p>
      <p><strong style="font-weight: bold">Disponibilidade:</strong> ${usuarioAtual.disponibilidadeHorário || "-"}</p>
      <p><strong style="font-weight: bold">Data de Cadastro:</strong> ${usuarioAtual.dataCadastro || "-"}</p>
    </div>
  `;
});

//botão editar informações
const btnEditar = document.getElementById("editarInfo");
const containerBotoes = document.querySelector(".botoes-edicao");
const nomeCompleto = document.getElementById("nomeCompleto");
const nomeUsuario = document.getElementById("nomeUsuario");
const infoUsuario = document.getElementById("infoUsuario");

function exibirUsuario() {
  // Mostra o nome e nome de usuário
  nomeCompleto.textContent = usuarioAtual.nome || "Nome Completo";
  nomeUsuario.textContent = usuarioAtual.usuario || "Usuário";

  // Cria o card com as informações
  infoUsuario.innerHTML = `
  
    <div class="card-info-usuario">
      <p><strong style="font-weight: bold;">E-mail:</strong> ${usuarioAtual.email || "-"}</p>
      <p><strong style="font-weight: bold;">CPF:</strong> ${usuarioAtual.cpf || "-"}</p>
      <p><strong style="font-weight: bold;">Idade:</strong> ${usuarioAtual.idade || "-"}</p>
      <p><strong style="font-weight: bold;">Celular:</strong> ${usuarioAtual.celular || "-"}</p>
      <p><strong style="font-weight: bold;">Endereço:</strong> ${usuarioAtual.endereço || "-"}</p>
      <p><strong style="font-weight: bold;">Gênero:</strong> ${usuarioAtual.genero || "-"}</p>
      <p><strong style="font-weight: bold;">Disponibilidade:</strong> ${usuarioAtual.disponibilidadeHorário || "-"}</p>
      <p><strong style="font-weight: bold;">Data de Cadastro:</strong> ${usuarioAtual.dataCadastro || "-"}</p>
    </div>
  `;
}


// Torna os campos editáveis
btnEditar.addEventListener("click", () => {
  if (btnEditar.textContent === "Editar informações") {
    // Transforma em inputs
    nomeCompleto.innerHTML = `<p><strong style="font-size: 15px;">Nome e Usuário:</strong><br><input style="width: 95%;" type="text" id="inputNome" value="${usuarioAtual.nome || ""}" /></p>`;
    nomeUsuario.innerHTML = `<p style="position: relative; bottom: 65px;"><input style="width: 95%;"  type="text" id="inputUsuario" value="${usuarioAtual.usuario || ""}" /></p>`;

    infoUsuario.innerHTML = `
        <p style="position: relative; bottom: 65px;"><strong selected disabled>CPF:</strong> ${usuarioAtual.cpf || "-"}</p>
        <p style="position: relative; bottom: 65px;"><strong>E-mail:</strong> <input style="width: 95%;"  type="email" id="inputEmail" value="${usuarioAtual.email || ""}" /></p>
        <p style="position: relative; bottom: 65px;"><strong>Idade:</strong> <input style="width: 95%;" type="number" id="inputIdade" value="${usuarioAtual.idade || ""}" min="18" /></p>
        <p style="position: relative; bottom: 65px;"><strong>Celular:</strong> <input style="width: 95%;" type="tel" id="inputCelular" value="${usuarioAtual.celular || ""}" 
          pattern="^\(\d{2}\) 9\d{4}-\d{4}$" 
          placeholder="(DDD) 9XXXX-XXXX" 
          title="O número deve estar no formato (XX) 9XXXX-XXXX" required />
        </p>
        <p style="position: relative; bottom: 65px;"><strong>Endereço:</strong> <input style="width: 95%;" type="text" id="inputEndereco" value="${usuarioAtual.endereço || ""}" /></p>
        <p style="position: relative; bottom: 65px;"><strong>Gênero:</strong> 
          <select style="width: 100%;" id="inputGenero">
            <option style="border-bottom: 1px solid #d6d2d2;" value="Feminino" ${usuarioAtual.generoInput === "Feminino" ? "selected" : ""}>Feminino</option>
            <option value="Masculino" ${usuarioAtual.generoInput === "Masculino" ? "selected" : ""}>Masculino"</option>
          </select>
        </p>
        <p style="position: relative; bottom: 65px;"><strong>Disponibilidade:</strong> 
          <select style="width: 100%;" id="inputDisponibilidade">
            <option style="border-bottom: 1px solid #d6d2d2;" value="manhã" ${usuarioAtual.disponibilidadeHorário === "manhã" ? "selected" : ""}>Manhã</option>
            <option value="tarde" ${usuarioAtual.disponibilidadeHorário === "tarde" ? "selected" : ""}>Tarde</option>
          </select>
        </p>
        <p style="position: relative; bottom: 65px;"><strong selected disabled style="font-weight: bold;">Data de Cadastro:</strong> ${usuarioAtual.dataCadastro || "-"}</p>
      `;



    //estilizando botões editar e cancelar
    btnEditar.style.position = "relative";
    btnEditar.style.bottom = "95px";
    btnEditar.textContent = "Salvar";

    const btnCancelar = document.createElement("button");
    btnCancelar.id = "cancelarEdicao";
    btnCancelar.textContent = "Cancelar";
    btnCancelar.style.position = "relative";
    btnCancelar.style.bottom = "90px";
    btnCancelar.style.background = "transparent";

    containerBotoes.style.height = "0";

    containerBotoes.appendChild(btnCancelar);
    // Ação do botão cancelar
    btnCancelar.addEventListener("click", () => {
      exibirUsuario(); // volta ao modo visual
      btnEditar.style.position = "relative";
      btnEditar.style.bottom = "35px";
      btnEditar.textContent = "Editar informações"; // reseta o botão
      btnCancelar.remove(); // remove o botão cancelar
    });


  } else {
    // Pega os novos valores
    const novoNome = document.getElementById("inputNome").value.trim();
    const novoUsuario = document.getElementById("inputUsuario").value.trim();
    const novoCelular = document.getElementById("inputCelular").value.trim();
    const novoEndereco = document.getElementById("inputEndereco").value.trim();
    const novoEmail = document.getElementById("inputEmail").value.trim();
    const novaDisp = document.getElementById("inputDisponibilidade").value.trim();
    const novoGenero = document.getElementById("inputGenero").value.trim();

    // valida idade
    const novaIdade = parseInt(document.getElementById("inputIdade").value.trim());

    if (isNaN(novaIdade) || novaIdade < 18) {
      alert("Desculpe, você precisa ter pelo menos 18 anos para se cadastrar 🥺");
      return;
    } else if (novaIdade > 90) {
      alert("Idade inválida. Verifique o valor informado ⚠️");
      return;
    }

    // Atualiza o objeto e salva no localStorage
    usuarioAtual.nome = novoNome;
    usuarioAtual.usuario = novoUsuario;
    usuarioAtual.celular = novoCelular;
    usuarioAtual.endereço = novoEndereco;
    usuarioAtual.email = novoEmail;
    usuarioAtual.idade = novaIdade;
    usuarioAtual.disponibilidadeHorário = novaDisp;
    usuarioAtual.generoInput = novoGenero;

    localStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual));

    // Atualiza a lista geral de usuários também
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const idx = usuarios.findIndex(u => u.cpf === usuarioAtual.cpf);
    if (idx !== -1) {
      usuarios[idx] = usuarioAtual;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // Volta à exibição normal
    exibirUsuario();
    btnEditar.textContent = "Editar informações";
    btnEditar.style.position = "relative";
    btnEditar.style.bottom = "35px";

    // Remove o botão cancelar, se ainda estiver
    const btnCancelar = document.getElementById("cancelarEdicao");
    if (btnCancelar) btnCancelar.remove();
  }

});


const lista = document.getElementById("listaFamilias");
const filtro = document.getElementById("filtro");
const busca = document.getElementById("busca");
const modal = document.getElementById("modalEdicao");
const formModal = document.getElementById("formEdicaoModal");
const closeModal = modal ? modal.querySelector(".close") : null;

let familias = JSON.parse(localStorage.getItem("familias")) || [];

// Função para salvar no localStorage
function salvarFamilias() {
  localStorage.setItem("familias", JSON.stringify(familias));
}

// Normalizar texto (remove acentos e coloca em minúsculas)
function normalizarTexto(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function exibirFamilias(tipoFiltro = "todas", termoBusca = "") {
  lista.innerHTML = ""; // limpa antes de mostrar

  let familiasFiltradas =
    tipoFiltro === "minhas"
      ? familias.filter(f => f.cadastradoPor === usuarioAtual.usuario)
      : familias.slice();

  // aplica a busca (ignora acentos)
  if (termoBusca.trim() !== "") {
    const termoNorm = normalizarTexto(termoBusca);
    familiasFiltradas = familiasFiltradas.filter(f =>
      normalizarTexto(f.nome).includes(termoNorm)
    );
  }


  if (familiasFiltradas.length === 0) {
    lista.innerHTML = "<p>Nenhuma Família encontrada.</p>";
    return;
  }

  // Exibe as familias
  familiasFiltradas.forEach((familia, index) => {
    const card = document.createElement("div");
    card.classList.add("card-familia");

    // Verifica permissão
    const podeEditar = usuarioAtual && familia.cadastradoPor === usuarioAtual.usuario;

    card.innerHTML = `
        <h3 style="font-size: 15px; font-weight: bold; text-decoration: underline">
          ${familia.nome}
        </h3>
        <div class="info">
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">Endereço:</strong> ${familia.endereço || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">CPF:</strong> ${familia.cpf || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">E-mail:</strong> ${familia.email || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">Celular:</strong> ${familia.celular || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">Total de Pessoas:</strong> ${familia.pessoas || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">Quantas são Crianças:</strong> ${familia.crianças || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">Situação de Trabalho:</strong> ${familia.SituaçãoTrabalho || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">Quantos Trabalham:</strong> ${familia.QuantosTrabalham || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">Total de Salários:</strong> ${familia.salarios || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">Situação de Moradia:</strong> ${familia.SituaçãoMoradia || "-"}</p>
          <p style="font-size: 11px;"><strong style="font-size: 11px; font-weight: bold;">Observações:</strong> ${familia.mensagem || "-"}</p>
          <p style="font-size: 14px; font-weight: bold;"><strong>Cadastrado por:</strong> ${familia.cadastradoPor || "-"}</p>
        </div>

        <div class="acoes-card" style="margin-top:10px;">
          ${podeEditar
        ? `<button class="editar" style="font-size:15px;" title="Editar"><i class="bi bi-pencil-square"></i></button>
               <button class="excluir" style="font-size:15px;" title="Excluir Família"><i class="bi bi-trash3"></i></button>`
        : `<button class="editar" style="position:relative; left:130%" disabled title="Somente o criador pode editar"><i class="bi bi-lock"></i></button>`
      }
        </div>
      `;

    const btnEditar = card.querySelector(".editar");
    const btnExcluir = card.querySelector(".excluir");

    if (btnEditar) {
      btnEditar.addEventListener("click", () => abrirModal(familia, index));
    }

    if (btnExcluir) {
      btnExcluir.addEventListener("click", () => {
        if (confirm(`Deseja realmente excluir a família "${familia.nome}"?`)) {

          const idxReal = familias.findIndex(f => f.cpf === familia.cpf && f.cadastradoPor === familia.cadastradoPor);
          if (idxReal !== -1) {
            familias.splice(idxReal, 1);
            salvarFamilias();
            exibirFamilias(filtro.value, busca.value);
          } else {
            alert("Erro ao localizar família para exclusão.");
          }
        }
      });
    }

    lista.appendChild(card);
  });
}

function abrirModal(familia) {
  if (!modal || !formModal) return;
  // Preenche campos do modal
  formModal.nome.value = familia.nome || "";
  formModal.email.value = familia.email || "";
  formModal.celular.value = familia.celular || "";
  formModal.SituaçãoMoradia.value = familia.SituaçãoMoradia || "";
  formModal.mensagem.value = familia.mensagem || "";
  modal.style.display = "block";

  // Ao submeter, atualiza o item correto no array original
  formModal.onsubmit = (e) => {
    e.preventDefault();
    // Acha o índice real do objeto (baseado em CPF + cadastradoPor)
    const idxReal = familias.findIndex(f => f.cpf === familia.cpf && f.cadastradoPor === familia.cadastradoPor);
    if (idxReal === -1) {
      alert("Erro: família não encontrada para salvar.");
      modal.style.display = "none";
      return;
    }
    familias[idxReal].nome = formModal.nome.value.trim();
    familias[idxReal].email = formModal.email.value.trim();
    familias[idxReal].celular = formModal.celular.value.trim();
    familias[idxReal].SituaçãoMoradia = formModal.SituaçãoMoradia.value.trim();
    familias[idxReal].mensagem = formModal.mensagem.value.trim();
    salvarFamilias();
    modal.style.display = "none";
    exibirFamilias(filtro.value, busca.value);
  };
}

// fechar modal
if (closeModal) closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };


if (filtro) filtro.addEventListener("change", () => exibirFamilias(filtro.value, busca.value));
if (busca) busca.addEventListener("input", () => exibirFamilias(filtro.value, busca.value));

const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual")) || null;
exibirFamilias("todas");

//Programando botão logout para o usuário
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
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

//Foto usuário
const inputFoto = document.getElementById("fotoUsuario");
const preview = document.getElementById("preview");
const iconePerfil = document.getElementById("iconePerfil");
const uploadBtn = document.getElementById('upload-btn');
const uploadMenu = document.getElementById('uploadMenu');
const mudarFoto = document.getElementById('mudarFoto');
const removerFoto = document.getElementById('removerFoto');

// se o usuário tiver foto salva, mostra ela
if (usuarioAtual.foto) {
  preview.src = usuarioAtual.foto;
  preview.style.display = "block";
  iconePerfil.style.display = "none";
}

// quando o usuário selecionar uma nova imagem
inputFoto.addEventListener("change", () => {
  const arquivo = inputFoto.files[0];
  if (arquivo) {
    const reader = new FileReader();
    reader.onload = e => {
      const base64 = e.target.result;
      preview.src = base64;
      preview.style.display = "block";
      iconePerfil.style.display = "none";

      // salva no objeto do usuário atual
      usuarioAtual.foto = base64;
      localStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual));

      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const idx = usuarios.findIndex(u => u.usuario === usuarioAtual.usuario);
      if (idx !== -1) {
        usuarios[idx].foto = base64;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
      }

    };
    reader.readAsDataURL(arquivo);
  }
});

// alterna visibilidade do menu
function toggleMenu(show) {
  if (show) {
    uploadMenu.classList.add('show');
    uploadMenu.setAttribute('aria-hidden', 'false');
    uploadBtn.setAttribute('aria-expanded', 'true');
  } else {
    uploadMenu.classList.remove('show');
    uploadMenu.setAttribute('aria-hidden', 'true');
    uploadBtn.setAttribute('aria-expanded', 'false');
  }
}

// fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!uploadBtn.contains(e.target) && !uploadMenu.contains(e.target)) {
    toggleMenu(false);
  }
});

// abrir menu ao clicar no botão
uploadBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu(uploadMenu.classList.contains('show') ? false : true);
});

// "Trocar foto" abre file picker
mudarFoto.addEventListener('click', () => {
  toggleMenu(false);
  inputFoto.click();
});

// "Remover foto" limpa preview e localStorage
removerFoto.addEventListener('click', () => {
  toggleMenu(false);
  preview.src = '';
  preview.style.display = 'none';
  iconePerfil.style.display = 'block';
});

// remove foto do usuarioAtual
usuarioAtual.foto = null;
localStorage.setItem('usuarioAtual', JSON.stringify(usuarioAtual));


// teclado: ESC fecha menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleMenu(false);
});

function Portal() {
    location.href = "Portal.html";
}

