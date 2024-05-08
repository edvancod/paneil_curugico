const form = document.getElementById('myForm');
const tbody = document.getElementById('tbody');
const btNovo = document.getElementById('bt-novo');
const btGravar = document.getElementById('bt-gravar');
const btApagar = document.getElementById('bt-apagar');

let lsItem = []

const statusColors = {
  'Transferído': '#72b2e7',
  'Em recuperação': '#72e7ad',
  'Pré-Operatorio': '#dbe772'
};

const tpStatus = {
  "Em Fila": "text-bg-info",
  Iniciado: "text-bg-success",
  Concluido: "text-bg-danger",
};


btNovo.addEventListener('click', novoForm);
btGravar.addEventListener('click', gravar);

form.addEventListener('submit', (e) => {
  e.preventDefault();
});


function novoForm() {
  const formulario = form.elements;
  for (const fieldBack of formulario) {
    fieldBack.value = '';
  }
}


function gravar() {
  let inicioPrevisto = document.getElementById('inicio_previsto').value;
  let inicioCirurgia = document.getElementById('inicio_cirurgia').value;
  let fimCirurgia = document.getElementById('fim_cirurgia').value;
  let saidaPrevista = document.getElementById('saida_prevista').value;
  let indice = document.getElementById("indice").value;
  let local = document.getElementById("local").value;
  let nome = document.getElementById("nome").value;
  let status = document.getElementById("status").value;
  if (nome!= "" && status!= "") {
    let obj = {};
    obj.nome = nome;
    obj.status = status;
    obj.local = local;
    obj.inicioPrevisto = inicioPrevisto;
    obj.inicioCirurgia = inicioCirurgia;
    obj.fimCirurgia = fimCirurgia;
    obj.saidaPrevista = saidaPrevista;

    if (indice == "") {
      createTableRow(obj);
    } else {
      updateTableRow(local, obj, indice);
    }

   
  } else {
    alert("Item e Status devem estar preenchidos");
  }
}



function createTableRow(formData) {
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
  deleteButton.addEventListener('click', () => deleteTableRow(newRow));
  newRow.appendChild(deleteButton);

  tbody.appendChild(newRow);
  lsItem.push(newRow);
}

function deleteTableRow(row) {
  tbody.removeChild(row);
  lsItem = lsItem.filter((item) => item!== row);
  localStorage.setItem("lsItem", JSON.stringify(lsItem));
}


async function getData() {
  const response = await fetch("https://api.zerosheets.com/v1/dnu");
  const data = await response.json();

  
  return data;
}

async function createRow(payload) {
 
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