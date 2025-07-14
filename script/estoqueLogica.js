document.addEventListener("DOMContentLoaded", () => {
  const listaBobinas = document.getElementById("listaBobinas");
  const totalSpan = document.getElementById("totalBobinas");
  const pesoSpan = document.getElementById("pesoTotal");

  const bobinas = JSON.parse(localStorage.getItem("bobinas")) || [];

  function renderizar(filtro = "todas") {
    listaBobinas.innerHTML = "";
    let filtradas = bobinas;

    // Filtro por status
    if (filtro !== "todas") {
      filtradas = bobinas.filter(b => b.status === filtro);
    }

    // Filtro por data
    const filtroData = document.getElementById("filtroData").value;
    if (filtroData) {
      filtradas = filtradas.filter(b => b.data === filtroData);
    }

    // Filtro por rastro
    const filtroRastro = document.getElementById("filtroRastro").value.toLowerCase();
    if (filtroRastro) {
      filtradas = filtradas.filter(b => b.rastro.toLowerCase().includes(filtroRastro));
    }

    let pesoTotal = 0;

    // Criar os cards com todas as informações
    filtradas.forEach(b => {
      const card = document.createElement("div");
      card.className = "card-bobina";

      // Cor lateral por status
      card.style.borderLeft = "6px solid " + (
        b.status === "Liberada" ? "green" :
        b.status === "Bloqueada" ? "red" : "orange"
      );

      card.innerHTML = `
        <strong>Rastro:</strong> ${b.rastro}<br>
        <strong>Data:</strong> ${b.data}<br>
        <strong>Status:</strong> ${b.status}<br>
        <strong>Tipo:</strong> ${b.tipo}<br>
        <strong>Diâmetro:</strong> ${b.diametro}<br>
        <strong>Furos:</strong> ${b.furos}<br>
        <strong>Comprimento:</strong> ${b.comprimento} m<br>
        <strong>Peso:</strong> ${b.peso?.toFixed(2) ?? "0.00"} kg<br>
        <strong>Observações:</strong> <em>${b.observacoes || "Sem observações."}</em><br>
      `;

      listaBobinas.appendChild(card);
      pesoTotal += parseFloat(b.peso || 0);
    });

    totalSpan.textContent = filtradas.length;
    pesoSpan.textContent = pesoTotal.toFixed(2);
  }

  // Tornar a função global para os filtros
  window.filtrar = renderizar;
  window.filtrarData = () => renderizar();
  window.filtrarRastro = () => renderizar();

  renderizar(); // inicial
});
