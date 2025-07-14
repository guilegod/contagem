document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formEstoque');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

      const novaBobina = {
    rastro: document.getElementById('rastro').value.trim(),
    data: document.getElementById('data').value,
    turno: document.getElementById('turno').value,
    tipo: document.getElementById('tipo').value,
    diametro: document.getElementById('diametro').value,
    furos: parseInt(document.getElementById('furos').value),
    comprimento: parseInt(document.getElementById('comprimento').value),
    status: document.getElementById('status').value,
    peso: parseFloat(document.getElementById('peso').value),
    observacoes: document.getElementById('observacoes').value.trim() || "Sem observações.",
    motivo: "",
  };

    // validação básica
    if (
      !novaBobina.rastro || !novaBobina.data || !novaBobina.turno ||
      !novaBobina.tipo || !novaBobina.diametro ||
      isNaN(novaBobina.furos) || isNaN(novaBobina.comprimento) ||
      !novaBobina.status
    ) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    // salva no localStorage
    const bobinas = JSON.parse(localStorage.getItem('bobinas')) || [];
    bobinas.push(novaBobina);
    localStorage.setItem('bobinas', JSON.stringify(bobinas));

    alert('Bobina cadastrada com sucesso!');
    form.reset();
  });
});
