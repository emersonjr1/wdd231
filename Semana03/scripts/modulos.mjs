import cursoBYUI from './curso.mjs';
import { definirSecaoSelecionada } from './secoes.mjs';
import { definirTitulo, renderizarSecoes } from "./saida.mjs";

document.querySelector("#matricularEstudante").addEventListener("click", function () {
  const numeroSecao = Number(document.querySelector("#numeroSecao").value); // Corrigido de Numero para Number
  cursoBYUI.mudarMatriculas(numeroSecao); // Corrigido de mudarMatricula para mudarMatriculas
  renderizarSecoes(cursoBYUI.secoes);
});
        
document.querySelector("#removerEstudante").addEventListener("click", function () {
  const numeroSecao = Number(document.querySelector("#numeroSecao").value); // Corrigido de Numero para Number
  cursoBYUI.mudarMatriculas(numeroSecao, false); // Corrigido de mudarMatricula para mudarMatriculas
  renderizarSecoes(cursoBYUI.secoes);
});

definirTitulo(cursoBYUI);
definirSecaoSelecionada(cursoBYUI.secoes);
renderizarSecoes(cursoBYUI.secoes);