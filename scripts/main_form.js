

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
  
}


function deleteRow(row) {
  row.remove();
}

async function getData() {
    const response = await fetch("https://api.zerosheets.com/v1/dnu");
    const data = await response.json();

    // will return an array of objects with the _lineNumber
    return data;
}

async function createRow(payload) {
    /* Payload should be an object with the columns you want to create, example:
    const payload = {
        column1: "foo",
        column2: "bar"
    };
    */
    const response = await fetch("https://api.zerosheets.com/v1/dnu", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    const data = await response.json();
  
    return data;
}

async function patchRow(lineNumber, payload) {
    /* Payload should be an object with the columns you want to update, example:

    const payload = {
        foo: "bar"
    };
    */
    const url = "https://api.zerosheets.com/v1/dnu/" + lineNumber;
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    
    // will return an object of the new row plus the _lineNumber
    return data;
}

async function deleteRow(lineNumber) {
    const url = "https://api.zerosheets.com/v1/dnu/" + lineNumber; // lineNumber comes from the get request
    await fetch(url, {
        method: "DELETE"
    });
    // No response data is returned
}

getData().then( (dados) =>{
  for (const formData of dados) {
    createTableRow(formData);
  }
  })