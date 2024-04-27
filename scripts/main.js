// Usuário: senai
// Senha: HRT2024

document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    const usuarioInput = document.getElementById('usuario').value;
    const senhaInput = document.getElementById('senha').value;
    const usuario = usuarioInput.value;
    const senha = senhaInput.value;
    const msg = document.getElementById('alerta')

if( usuario == 'senai' && senha == 'HRT2024'){
    
    window.location.href ='form.html'
}else{
    alert('senha errada !!')
msg.style.display = 'block';
    
}


});
document.getElementById('usuario').addEventListener('focus', function() {
    // Verifica se o usuário é correto ao ganhar o foco
    if (this.value === 'senai') {
        this.style.borderColor = 'green';
    } else {
        this.style.borderColor = ''; // Reinicia a cor da borda se não for o usuário correto
    }
});