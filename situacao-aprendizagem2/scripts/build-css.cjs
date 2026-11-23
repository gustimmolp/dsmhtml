/*
Descricao: Situação de Aprendizagem 02
nome_arquivo: build-css.cjs
nome_exercicio: Situação de Aprendizagem 01
nome_aluno: Cleiton Carlos Silveira de Arruda
email_aluno: cleiton.arruda@aluno.cps.sp.gov.br
turma: WEBI-ISW028-A
*/
const { readFile, writeFile } = require('node:fs/promises');
const { compile } = require('tailwindcss');

async function buildCss() {
    const source = await readFile('static/css/tailwind.input.css', 'utf8');
    const pages = await Promise.all(
        ['index.html', 'perfil.html', 'consulta.html'].map((file) => readFile(file, 'utf8')),
    );
    const classes = pages.flatMap((page) => (
        Array.from(page.matchAll(/class="([^"]*)"/g), ([, value]) => value.split(/\s+/)).flat()
    ));
    const { build } = await compile(source);
    const header = `/*
Descricao: Situação de Aprendizagem 02
nome_arquivo: tailwind.css
nome_exercicio: Situação de Aprendizagem 01
nome_aluno: Cleiton Carlos Silveira de Arruda
email_aluno: cleiton.arruda@aluno.cps.sp.gov.br
turma: WEBI-ISW028-A
*/
`;
    await writeFile('static/css/tailwind.css', header + build(classes));
}

buildCss().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
