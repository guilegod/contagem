document.addEventListener('DOMContentLoaded', () => {
  const listaAguardando = document.getElementById('listaAguardando');
  const listaLiberadas  = document.getElementById('listaLiberadas');
  const resumoDiv       = document.getElementById('resumo');

  function carregarBobinas() {
    return JSON.parse(localStorage.getItem('bobinas')) || [];
  }

  function salvarBobinas(arr) {
    localStorage.setItem('bobinas', JSON.stringify(arr));
  }

  function atualizarResumo(bobinas) {
    // conta por tipo+diâmetro
    const contagem = bobinas.reduce((acc, b) => {
      const key = `${b.tipo} ${b.diametro}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // renderiza
    resumoDiv.innerHTML = Object.entries(contagem)
      .map(([k, v]) => `<p>${k}: ${v}</p>`)
      .join('');
  }

  function renderizar() {
    const bobinas = carregarBobinas();
    listaAguardando.innerHTML = '';
    listaLiberadas.innerHTML  = '';
    atualizarResumo(bobinas);

    bobinas.forEach((b, idx) => {
      const card = document.createElement('div');
      card.className = 'card card-produto';
      card.innerHTML = `
        <h3 class="rastroOP">Rastro: <span class="rastroID">${b.rastro}</span></h3>
        <p>Data: <span class="dataProduto">${b.data}</span></p>
        <p>Turno: <span class="turnoProduto">${b.turno}</span></p>
        <p>Tipo: <span class="tipoProduto">${b.tipo}</span></p>
        <p>Diâmetro: <span class="diametroProduto">${b.diametro}</span></p>
        <p>Furos: <span class="furosProduto">${b.furos}</span></p>
        <p>Comprimento: <span class="metrosProduto">${b.comprimento}</span></p>
        <p>Status: <span class="statusProduto">${b.status}</span></p>
        <button class="btn-excluir" data-index="${idx}">Excluir</button>
        
      `;
      const link = document.createElement("a");
      link.href = `detalhes.html?rastro=${b.rastro}`;
      link.textContent = "Ver detalhes";
      card.appendChild(link);

      if (b.status === 'Aguardando Laudo') {
        listaAguardando.appendChild(card);
      } else {
        listaLiberadas.appendChild(card);
      }

    // Aplicar classe de borda colorida por status (opcional, se já estiver)
  if (b.status === "Liberada") card.classList.add("status-liberada");
  else if (b.status === "Bloqueada") card.classList.add("status-bloqueada");
  else card.classList.add("status-aguardando");

  if (b.status === "Liberada") {
    listaLiberadas.appendChild(card);
  } else if (b.status === "Bloqueada") {
    listaBloqueadas.appendChild(card); // precisa adicionar essa sessão também se for usar
  } else {
    listaAguardando.appendChild(card);
  }
});

    // vincula eventos de delete
    document.querySelectorAll('.btn-excluir').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = parseInt(e.currentTarget.dataset.index, 10);
        const arr = carregarBobinas();
        arr.splice(i, 1);
        salvarBobinas(arr);
        renderizar(); // rerenderiza tudo
      });
    });
  }

  renderizar();
});
document.getElementById('btn-exemplo').addEventListener('click', () => {
  const bobinasTeste = [
    {
      rastro: "R001",
      data: "2025-07-10",
      turno: "1Turno",
      tipo: "PEWQ",
      diametro: "4.76",
      furos: "Sim",
      comprimento: "25",
      status: "Aguardando Laudo"
    },
    {
      rastro: "R002",
      data: "2025-07-10",
      turno: "2Turno",
      tipo: "PEWQ",
      diametro: "6.35",
      furos: "Não",
      comprimento: "30",
      status: "Liberada"
    },
    {
      rastro: "R003",
      data: "2025-07-09",
      turno: "3Turno",
      tipo: "PEWQ",
      diametro: "4.76",
      furos: "Sim",
      comprimento: "20",
      status: "Bloqueada",
      motivo: "Oxidação"
    },
    {
      rastro: "R004",
      data: "2025-07-09",
      turno: "1Turno",
      tipo: "PESR",
      diametro: "9.52",
      furos: "Não",
      comprimento: "22",
      status: "Aguardando Laudo"
    },
    {
      rastro: "R005",
      data: "2025-07-08",
      turno: "2Turno",
      tipo: "PEWQ",
      diametro: "6.35",
      furos: "Sim",
      comprimento: "28",
      status: "Liberada"
    },
    {
      rastro: "R006",
      data: "2025-07-08",
      turno: "3Turno",
      tipo: "PESR",
      diametro: "9.52",
      furos: "Sim",
      comprimento: "35",
      status: "Bloqueada",
      motivo: "Furos fora da tolerância"
    },
    {
      rastro: "R007",
      data: "2025-07-07",
      turno: "1Turno",
      tipo: "PEWQ",
      diametro: "4.76",
      furos: "Não",
      comprimento: "27",
      status: "Aguardando Laudo"
    },
    {
      rastro: "R008",
      data: "2025-07-07",
      turno: "2Turno",
      tipo: "PEWQ",
      diametro: "6.35",
      furos: "Sim",
      comprimento: "29",
      status: "Liberada"
    },
    {
      rastro: "R009",
      data: "2025-07-06",
      turno: "3Turno",
      tipo: "PESR",
      diametro: "9.52",
      furos: "Sim",
      comprimento: "24",
      status: "Bloqueada",
      motivo: "Deformação"
    },
    {
      rastro: "R010",
      data: "2025-07-06",
      turno: "1Turno",
      tipo: "PEWQ",
      diametro: "4.76",
      furos: "Não",
      comprimento: "26",
      status: "Liberada"
    }
  ];

  localStorage.setItem('bobinas', JSON.stringify(bobinasTeste));
  alert('Bobinas de exemplo carregadas com sucesso!');
  location.reload(); // Recarrega a página pra exibir os dados
});
