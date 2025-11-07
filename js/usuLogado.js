window.addEventListener("DOMContentLoaded", () => {
  //Verificação de login logo no início
  const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  if (!usuarioAtual) {
    alert("Acesso negado! Faça login para continuar.");
    window.location.href = "login.html";
    return;
  }

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
  nomeCompleto.textContent = usuario.nome || "Nome Completo";
  nomeUsuario.textContent = usuario.usuario || "Usuário";

  // Cria o card com as informações
  infoUsuario.innerHTML = `
    <div class="card-info-usuario">
      <p><strong>E-mail:</strong> ${usuario.email || "-"}</p>
      <p><strong>CPF:</strong> ${usuario.cpf || "-"}</p>
      <p><strong>Idade:</strong> ${usuario.idade || "-"}</p>
      <p><strong>Celular:</strong> ${usuario.celular || "-"}</p>
      <p><strong>Endereço:</strong> ${usuario.endereço || "-"}</p>
      <p><strong>Gênero:</strong> ${usuario.genero || "-"}</p>
      <p><strong>Disponibilidade:</strong> 0${usuario.disponibilidadeHorário || "-"}</p>
      <p><strong>Data de Cadastro:</strong> ${usuario.dataCadastro || "-"}</p>
    </div>
  `;
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

  // "Remover foto" -> limpa preview e localStorage
  removerFoto.addEventListener('click', () => {
    toggleMenu(false);
    preview.src = '';
    preview.style.display = 'none';
    icone.style.display = 'block';
  });

  // remove foto do usuarioAtual
  usuarioAtual.foto = null;
  localStorage.setItem('usuarioAtual', JSON.stringify(usuarioAtual));

  // quando o user escolhe um arquivo
  inputFoto.addEventListener('change', () => {
    const file = fotoInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      preview.src = base64;
      preview.style.display = 'block';
      icone.style.display = 'none';
      // salva nos dados do usuário
      usuarioAtual.foto = base64;
      localStorage.setItem('usuarioAtual', JSON.stringify(usuarioAtual));

      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const idx = usuarios.findIndex(u => u.usuario === usuarioAtual.usuario);
      if (idx !== -1) {
        usuarios[idx].foto = base64;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
      }
    };
    reader.readAsDataURL(file);
  });

  // teclado: ESC fecha menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

});
