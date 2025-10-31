// Algoritmo: -Criar Cards para visualizar a família cadastrada por ele


window.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaFamilias");
  const familias = JSON.parse(localStorage.getItem("familias")) || [];

  if (familias.length === 0) {
    lista.innerHTML = "<p>Nenhuma família cadastrada ainda.</p>";
    return;
  }

  familias.forEach(familia => {
    const card = document.createElement("div");
    card.classList.add("card-familia");

    card.innerHTML = `
      <h3>${familia.nome}</h3>
      <p><strong>Endereço:</strong> ${familia.endereço}</p>
      <p><strong>CPF:</strong> ${familia.cpf}</p>
      <p><strong>E-mail:</strong> ${familia.email}</p>
      <p><strong>Celular:</strong> ${familia.celular}</p>
      <p><strong>Total de Pessoas:</strong> ${familia.pessoas}</p>
      <p><strong>Quantas são Crianças:</strong> ${familia.crianças}</p>
      <p><strong>Situação de Trabalho:</strong> ${familia.SituaçãoTrabalho}</p>
      <p><strong>Quantos Trabalham:</strong> ${familia.QuantosTrabalham}</p>
      <p><strong>Total de Salários:</strong> ${familia.salarios}</p>
      <p><strong>Situação de Moradia:</strong> ${familia.SituaçãoMoradia}</p>
      <p><strong>Observações:</strong> ${familia.mensagem}</p>
      <p><strong>Cadastrada por:</strong> ${familia.cadastradoPor}</p>
    `;

    lista.appendChild(card);
  });
});
