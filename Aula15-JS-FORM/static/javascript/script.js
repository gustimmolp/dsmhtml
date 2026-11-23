/*
Descricao: Aula 15 - JavaScript aplicado a Formulários
nome_arquivo: script.js
nome_exercicio: Aula 15 - JavaScript aplicado a Formulários
nome_aluno: Cleiton Carlos Silveira de Arruda
email_aluno: cleiton.arruda@aluno.cps.sp.gov.br
turma: WEBI-ISW028-A
*/
const comentario = document.getElementById('comentario');
const contador = document.getElementById('contador');
const barraComentario = document.getElementById('barra-comentario');

comentario.addEventListener('input', () => {
    const restantes = comentario.maxLength - comentario.value.length;
    const texto = restantes === 1 ? 'caractere restante' : 'caracteres restantes';

    contador.textContent = restantes + ' ' + texto;
    contador.classList.toggle('erro', restantes === 0);
    barraComentario.style.width = (comentario.value.length / comentario.maxLength * 100) + '%';
    barraComentario.setAttribute('aria-valuenow', comentario.value.length);
    barraComentario.classList.toggle('bg-danger', restantes === 0);
});

const senha = document.getElementById('senha');
const confirmacao = document.getElementById('confirmacao');
const mensagemSenha = document.getElementById('mensagem-senha');
const cadastrar = document.getElementById('cadastrar');

function conferirSenhas() {
    const confirmou = confirmacao.value !== '';
    const coincidem = confirmou && senha.value === confirmacao.value;

    mensagemSenha.textContent = '';

    if (confirmou) {
        mensagemSenha.textContent = coincidem ? 'As senhas coincidem' : 'As senhas são diferentes';
    }

    mensagemSenha.classList.toggle('sucesso', coincidem);
    mensagemSenha.classList.toggle('erro', confirmou && !coincidem);
    cadastrar.disabled = !coincidem;
}

senha.addEventListener('input', conferirSenhas);
confirmacao.addEventListener('input', conferirSenhas);
document.getElementById('form-senha').addEventListener('submit', (evento) => {
    evento.preventDefault();
});

const produto = document.getElementById('produto');
const quantidade = document.getElementById('quantidade');
const total = document.getElementById('total');
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function atualizarTotal() {
    const unidades = quantidade.validity.valid ? Number(quantidade.value) : 0;
    total.textContent = 'Total: ' + moeda.format(Number(produto.value) * unidades);
}

produto.addEventListener('change', atualizarTotal);
quantidade.addEventListener('input', atualizarTotal);
document.getElementById('form-pedido').addEventListener('submit', (evento) => {
    evento.preventDefault();
});

document.getElementById('form-produto').addEventListener('submit', (evento) => {
    evento.preventDefault();

    const cadastro = {
        nome: document.getElementById('nome').value.trim(),
        categoria: document.getElementById('categoria').value.trim(),
        preco: document.getElementById('preco').valueAsNumber
    };

    const resultado = document.getElementById('json');
    resultado.textContent = JSON.stringify(cadastro, null, 4);
    resultado.hidden = false;
});

const telefone = document.getElementById('telefone');

telefone.addEventListener('input', () => {
    const digitos = telefone.value.replace(/\D/g, '').slice(0, 11);

    telefone.value = digitos
        .replace(/^(\d)/, '($1')
        .replace(/^(\(\d{2})(\d)/, '$1) $2')
        .replace(/^(\(\d{2}\) \d{5})(\d)/, '$1-$2');
});

const departamento = document.getElementById('departamento');
const funcionario = document.getElementById('funcionario');
const funcionarios = {
    TI: ['Allan', 'Beatriz', 'Carlos'],
    RH: ['Daniela', 'Eduardo']
};

function atualizarFuncionarios() {
    const nomes = funcionarios[departamento.value] || [];
    funcionario.replaceChildren();
    funcionario.disabled = nomes.length === 0;

    if (funcionario.disabled) {
        funcionario.add(new Option('Selecione um departamento', ''));
    }

    for (const nome of nomes) {
        funcionario.add(new Option(nome, nome));
    }
}

departamento.addEventListener('change', atualizarFuncionarios);

const habilidade = document.getElementById('habilidade');
const habilidades = document.getElementById('habilidades');

document.getElementById('form-habilidades').addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = habilidade.value.trim();

    if (nome === '') {
        return;
    }

    const etiqueta = document.createElement('li');
    etiqueta.textContent = nome;

    const remover = document.createElement('button');
    remover.type = 'button';
    remover.className = 'btn btn-secondary btn-sm';
    remover.textContent = 'X';
    remover.setAttribute('aria-label', 'Remover ' + nome);
    remover.addEventListener('click', () => {
        etiqueta.remove();
        habilidade.focus();
    });

    etiqueta.appendChild(remover);
    habilidades.appendChild(etiqueta);
    habilidade.value = '';
    habilidade.focus();
});

const nascimento = document.getElementById('nascimento');
const avisoIdade = document.getElementById('aviso-idade');
const finalizar = document.getElementById('finalizar');

function conferirIdade() {
    const hoje = new Date();
    const [ano, mes, dia] = nascimento.value.split('-').map(Number);
    const aniversarioPassou = hoje.getMonth() + 1 > mes ||
        (hoje.getMonth() + 1 === mes && hoje.getDate() >= dia);
    const idade = hoje.getFullYear() - ano - (aniversarioPassou ? 0 : 1);
    const menorDeIdade = nascimento.value !== '' && idade < 18;

    finalizar.disabled = nascimento.value === '' || menorDeIdade;
    avisoIdade.textContent = menorDeIdade ? 'Apenas para maiores de idade' : '';
    avisoIdade.classList.toggle('erro', menorDeIdade);
}

nascimento.addEventListener('input', conferirIdade);
document.getElementById('form-idade').addEventListener('submit', (evento) => {
    evento.preventDefault();
});

const selecionarTodos = document.getElementById('selecionar-todos');
const itens = Array.from(document.querySelectorAll('.item'));

function atualizarSelecao() {
    selecionarTodos.checked = itens.every((item) => item.checked);
}

selecionarTodos.addEventListener('change', () => {
    for (const item of itens) {
        item.checked = selecionarTodos.checked;
    }
});

for (const item of itens) {
    item.addEventListener('change', atualizarSelecao);
}

const tema = document.getElementById('tema');

try {
    tema.checked = localStorage.getItem('tema') === 'escuro';
} catch (erro) {
    tema.checked = false;
}

function aplicarTema() {
    document.body.classList.toggle('dark-theme', tema.checked);
    document.documentElement.dataset.bsTheme = tema.checked ? 'dark' : 'light';
}

aplicarTema();

tema.addEventListener('change', () => {
    aplicarTema();

    try {
        localStorage.setItem('tema', tema.checked ? 'escuro' : 'claro');
    } catch (erro) {
        return;
    }
});

conferirSenhas();
atualizarTotal();
atualizarFuncionarios();
conferirIdade();
atualizarSelecao();
