// Algoritmo: -Criar Cards para visualizar a família cadastrada por ele


const lista = document.getElementById("listaFamilias");
const familias = JSON.parse(localStorage.getItem("familias")) || [];

lista.innerHTML = "";

familias.forEach(familia => {
    const card = document.createElement("div");
    card.classList.add("card-familias");
    card.innerHTML = `
      <h3>${familia.nome}</h3>
      <p><strong>Classe:</strong> ${familia.classe}</p>
      <p class="cadastradoPor">Cadastrada por: ${familia.cadastradoPor}</p>
    `;
    lista.appendChild(card);
});