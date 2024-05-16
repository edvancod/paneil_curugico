// Usuário: senai
// Senha: HRT2024

document.getElementById('usuario').addEventListener('input', function (e) {
    const nome = e.target.value.trim();
    const nomePattern = /^[a-zA-Zà-úÀ-Ú]{3,50}$/;

    if (!nomePattern.test(nome)) {
        e.target.setCustomValidity('Por favor, informe um nome válido com no mínimo 3 e no máximo 50 caracteres.');
    } else {
        e.target.setCustomValidity('');
    }
});


document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const msg = document.getElementById('alerta')
    if (usuario === 'senai' && senha === 'HRT2024') {
        window.location.href = 'gerenciador.html';
    } else {
        alert('Senha incorreta!');
        msg.style.display = 'block';
    }
});

document.getElementById('btn').addEventListener('click', function () {
   
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const msg = document.getElementById('alerta')
    if (usuario === 'senai' && senha === 'HRT2024') {
        window.location.href = 'painel.html';
    } else {
        alert('Senha incorreta!');
        msg.style.display = 'block';
    }
});
document.getElementById('usuario').addEventListener('click', function () {
    const msg = document.getElementById('alerta');
    msg.style.display = 'none';
});



