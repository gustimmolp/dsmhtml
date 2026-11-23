/*
Descricao: Situação de Aprendizagem 02
nome_arquivo: login.js
nome_exercicio: Situação de Aprendizagem 01
nome_aluno: Cleiton Carlos Silveira de Arruda
email_aluno: cleiton.arruda@aluno.cps.sp.gov.br
turma: WEBI-ISW028-A
*/
const form = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('#login-error');

form.addEventListener('input', () => {
    error.hidden = true;
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (email.value.trim().toLowerCase() !== 'marina@nexo.exemplo' || password.value !== 'nexo2026') {
        error.hidden = false;
        password.focus();
        return;
    }

    sessionStorage.setItem('nexo-session', 'marina@nexo.exemplo');
    window.location.assign('perfil.html');
});
