export function definirTitulo(curso) {
  document.querySelector("#nomeCurso").textContent = curso.nome;
  document.querySelector("#codigoCurso").textContent = curso.codigo;
}

// Corrigido: Adicionado 'export'
export function renderizarSecoes(secoes) {
  const html = secoes.map(
    (secao) => `<tr>
    <td>${secao.numeroSecao}</td>
    <td>${secao.matriculados}</td>
    <td>${secao.instrutor}</td></tr>`
  );
  document.querySelector("#secoes").innerHTML = html.join("");
}