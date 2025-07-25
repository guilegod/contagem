document.addEventListener("DOMContentLoaded", () => {
  const listaDiv = document.getElementById("listaBobinas");
  const aguardandoQtd = document.getElementById("aguardandoQtd");
  const bloqueadasQtd = document.getElementById("bloqueadasQtd");
  const producaoDia = document.getElementById("producaoDia");

  const bobinas = JSON.parse(localStorage.getItem("bobinas")) || [];

  const hoje = new Date().toISOString().slice(0, 10);

  let contagem = {
    aguardando: 0,
    bloqueado: 0,
    liberado: 0,
    producaoDia: 0
  };

  const ultimas = bobinas.slice(-100).reverse();

  ultimas.forEach((bobina) => {
    const status = bobina.status.toLowerCase();
    const card = document.createElement("div");
    card.classList.add("bobina-card", status);
    card.innerHTML = `
      <strong>Rastro:</strong> ${bobina.rastro}<br/>
      <strong>Data:</strong> ${bobina.data}<br/>
      <strong>Status:</strong> ${bobina.status}<br/>
      <strong>Diâmetro:</strong> ${bobina.diametro}<br/>
      <strong>Peso:</strong> ${bobina.peso} kg
    `;
    listaDiv.appendChild(card);

    if (status === "aguardando") contagem.aguardando++;
    if (status === "bloqueado") contagem.bloqueado++;
    if (status === "liberado") contagem.liberado++;
    if (bobina.data === hoje) contagem.producaoDia++;
  });

  aguardandoQtd.textContent = contagem.aguardando;
  bloqueadasQtd.textContent = contagem.bloqueado;
  producaoDia.textContent = contagem.producaoDia;

  // Gráfico
  const ctx = document.getElementById("graficoBobinas").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Liberadas", "Aguardando", "Bloqueadas", "Produção do Dia"],
      datasets: [{
        label: "Quantidade",
        data: [
          contagem.liberado,
          contagem.aguardando,
          contagem.bloqueado,
          contagem.producaoDia
        ],
        backgroundColor: ["#4caf50", "#ffc107", "#f44336", "#2196f3"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});
