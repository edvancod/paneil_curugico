const form = document.getElementById('myForm');
const tbody = document.getElementById('tbody');
const btNovo = document.getElementById('bt-novo');
const btGravar = document.getElementById('bt-gravar');
const btApagar = document.getElementById('bt-apagar');

let lsItem = [];

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

btNovo.addEventListener('click', limparForm);
btGravar.addEventListener('click', gravar);


form.addEventListener('submit', (e) => {
  e.preventDefault();
});

function gravar() {
let inicioPrevisto = document.getElementById('inicio_previsto').value;
let inicioCirurgia = document.getElementById('inicio_cirurgia').value;
let fimCirurgia = document.getElementById('fim_cirurgia').value;
let saidaPrevista = document.getElementById('saida_prevista').value;
  let indice = document.getElementById("indice").value;
  let local = document.getElementById("local").value;
  let item = document.getElementById("nome").value;
  let status = document.getElementById("status").value;
  if (item != "" && status != "") {
    let obj = {};
    obj.nome = item;
    obj.status = status;
    obj.local = local;
    obj.inicioPrevisto = inicioPrevisto;
    obj.inicioCirurgia = inicioCirurgia;
    obj.fimCirurgia = fimCirurgia;
    obj.saidaPrevista = saidaPrevista;

    if (indice == "") {
      const newRow = createRow(obj);
      tbody.appendChild(newRow);
      lsItem.push(newRow);
    } else {
      patchRow(local, obj, indice);
      lsItem[indice] = obj;
    }

    localStorage.setItem("lsItem", JSON.stringify(lsItem));
    limparForm();
  } else {
    alert("Item e Status devem estar preenchidos");
  }
}

function limparForm() {
  document.getElementById("indice").value = "";
  document.getElementById("_lineNumber").value = "";
  document.getElementById("item").value = "";
  document.getElementById("status").value = "";
}

function createRow(formData) {
  return new Promise((resolve) => {
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

    

    tbody.appendChild(newRow);
    resolve(newRow);
  });
}

function updateData(row, formData) {
  row.children[0].textContent = formData.nome;
  row.children[1].textContent = `${formData.status} (Sala ${formData.local})`;
  row.children[2].textContent = formData.inicioPrevisto;
  row.children[3].textContent = formData.inicioCirurgia;
  row.children[4].textContent = formData.fimCirurgia;
  row.children[5].textContent = formData.saidaPrevista;
}

// Add the rest of the functions (deleteRow, patchRow, ataulizarTabela, and editar)