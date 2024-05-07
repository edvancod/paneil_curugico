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

    localStorage.setItem("lsItem", JSON.stringify(lsItem));
    limparForm();
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

async function createRowInZeroSheet(payload) {
  const response = await fetch("https://api.zerosheets.com/v1/dnu", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  const data = await response.json();

  return data;
}

function updateTableRow(local, obj, indice) {
  const row = lsItem[indice];
  row.children[0].textContent = obj.nome;
  row.children[1].textContent = `${obj.status} (Sala ${obj.local})`;
  row.children[2].textContent = obj.inicioPrevisto;
  row.children[3].textContent = obj.inicioCirurgia;
  row.children[4].textContent = obj.fimCirurgia;
  row.children[5].textContent = obj.saidaPrevista;

  const payload = {
    nome: obj.nome,
    status: obj.status,
    local: obj.local,
    inicioPrevisto: obj.inicioPrevisto,
    inicioCirurgia: obj.inicioCirurgia,
    fimCirurgia: obj.fimCirurgia,
    saidaPrevista: obj.saidaPrevista
  };

  patchRowInZeroSheet(row.children[1].textContent.split(' ')[1], payload).then((data) => {
    lsItem[indice] = data;
    localStorage.setItem("lsItem", JSON.stringify(lsItem));
  });
}

async function patchRowInZeroSheet(lineNumber, payload) {
  const url = "https://api.zerosheets.com/v1/dnu/" + lineNumber;
  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
  const data = await response.json();

  return data;
}

document.addEventListener('DOMContentLoaded', () => {
  lsItem.forEach((item, index) => {
    const row = item;
    const payload = {
      nome: row.children[0].textContent,
      status: row.children[1].textContent.split(' ')[0],
      local: row.children[1].textContent.split(' ')[2],
      inicioPrevisto: row.children[2].textContent,
      inicioCirurgia: row.children[3].textContent,
      fimCirurgia: row.children[4].textContent,
      saidaPrevista: row.children[5].textContent
    };

    if (index === lsItem.length - 1) {
      createTableRow(payload);
    } else {
      updateTableRow(payload.local, payload, index);
    }
  });
});

