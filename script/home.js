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

      if (b.status === 'Aguardando Laudo') {
        listaAguardando.appendChild(card);
      } else {
        listaLiberadas.appendChild(card);
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
