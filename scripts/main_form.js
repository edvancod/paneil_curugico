const form = document.getElementById('myForm');
const tbody = document.getElementById('tbody');

const statusColors = {
    preOperatório: '#72b2e7',
    operatorio: '#72e7ad',
    emAndamento: '#dbe772'
  };

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const pacienteNome = document.getElementById('nome').value;
  const status = document.getElementById('status').value;
  const local = document.getElementById('local').value;
  const inicio = document.getElementById('inicio_previsto').value;
  const inicioCirurgia = document.getElementById('inicio_cirurgia').value;
  const fimCirurgia = document.getElementById('fim_cirurgia').value;
  const saidaPrevista = document.getElementById('saida_prevista').value;

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${pacienteNome}</td>
    <td style="background-color: ${statusColors[status]}">${status}(Sala ${local})</td>
    <td>${inicio}</td>
    <td>${inicioCirurgia}</td>
    <td>${fimCirurgia}</td>
    <td>${saidaPrevista}</td>
  `;
  tbody.appendChild(newRow);

  document.getElementById('nome').value = '';
  document.getElementById('status').value = '';
  document.getElementById('local').value = '';
  document.getElementById('inicio_previsto').value = '';
  document.getElementById('inicio_cirurgia').value = '';
  document.getElementById('fim_cirurgia').value = '';
  document.getElementById('saida_prevista').value = '';
});