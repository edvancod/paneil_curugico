

const form = document.getElementById('myForm');
const tbody = document.getElementById('tbody');
const btNovo = document.getElementById('bt-novo');
const btGravar = document.getElementById('bt-gravar');


btNovo.addEventListener('click', clearForm);
btGravar.addEventListener('click', saveData);




const statusColors = {
  
  'Transferído': '#72b2e7',
  'Em recuperação': '#72e7ad',
  'Pré-Operatorio': '#dbe772'
};



form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = getFormData(e.target);
  const newRow = createRow(formData);
  tbody.appendChild(newRow);
});



function getFormData(form) {
  return {
    nome: form.nome.value,
    status: form.status.value,
    local: form.local.value,
    inicioPrevisto: form.inicio_previsto.value,
    inicioCirurgia: form.inicio_cirurgia.value,
    fimCirurgia: form.fim_cirurgia.value,
    saidaPrevista: form.saida_prevista.value
  };
}

function createRow(formData) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${formData.nome}</td>
    <td style="background-color: ${statusColors[formData.status]}">${formData.status} (Sala ${formData.local})</td>
    <td>${formData.inicioPrevisto}</td>
    <td>${formData.inicioCirurgia}</td>
    <td>${formData.fimCirurgia}</td>
    <td>${formData.saidaPrevista}</td>
  `;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Apagar';
  deleteButton.style.backgroundColor = '#f5425d';
  deleteButton.style.color= '#fff';
  deleteButton.style.border = 'none';
  deleteButton.style.borderRadius = '5px';
  deleteButton.style.cursor = 'pointer';
  deleteButton.style.padding = '5px 10px';
  deleteButton.addEventListener('click', () => deleteRow(newRow));
  newRow.appendChild(deleteButton);
  return newRow;
}

function clearForm() {
  form.reset();
}

function saveData() {
  // Save data to a database or local storage
}


function deleteRow(row) {
  row.remove();
}