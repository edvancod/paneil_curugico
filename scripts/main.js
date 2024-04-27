// Usuário: senai
// Senha: HRT2024

document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
  
    const msg = document.getElementById('alerta')

if( usuario == 'senai' && senha == 'HRT2024'){
    
    window.location.href ='form.html'
}else{
    alert('senha errada !!')
msg.style.display = 'block';
    
}


});
