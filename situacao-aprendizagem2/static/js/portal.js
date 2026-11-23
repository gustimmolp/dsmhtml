/*
Descricao: Situação de Aprendizagem 02
nome_arquivo: portal.js
nome_exercicio: Situação de Aprendizagem 01
nome_aluno: Cleiton Carlos Silveira de Arruda
email_aluno: cleiton.arruda@aluno.cps.sp.gov.br
turma: WEBI-ISW028-A
*/
function checkSession() {
    if (sessionStorage.getItem('nexo-session') !== 'marina@nexo.exemplo') {
        window.location.replace('index.html');
    }
}

checkSession();
window.addEventListener('pageshow', checkSession);

document.querySelector('[data-sign-out]').addEventListener('click', () => {
    sessionStorage.removeItem('nexo-session');
});

const search = document.querySelector('#search');

if (search) {
    const sector = document.querySelector('#sector');
    const table = document.querySelector('.table-responsive');
    const count = document.querySelector('#result-count');
    const empty = document.querySelector('#empty-results');
    const reset = document.querySelector('#reset-filters');
    const normalize = (text) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    const entries = Array.from(document.querySelectorAll('#directory tr'), (row) => {
        const name = row.querySelector('.directory-name').textContent;
        const department = row.cells[1].textContent.trim();
        const role = row.cells[2].textContent;
        return { row, department, terms: [name, department, role].map(normalize) };
    });

    function updateResults() {
        const query = normalize(search.value.trim());
        let matched = 0;

        for (const { row, department, terms } of entries) {
            const matchesSector = !sector.value || department === sector.value;
            const matchesSearch = terms.some((term) => term.includes(query));
            row.hidden = !(matchesSector && matchesSearch);
            matched += Number(!row.hidden);
        }

        count.textContent = matched === 1 ? '1 colaborador' : `${matched} colaboradores`;
        table.hidden = matched === 0;
        empty.hidden = matched > 0;
    }

    search.addEventListener('input', updateResults);
    sector.addEventListener('change', updateResults);
    window.addEventListener('pageshow', updateResults);
    reset.addEventListener('click', () => {
        search.value = '';
        sector.value = '';
        search.focus();
        updateResults();
    });
}
