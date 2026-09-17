document.querySelector("#matricularEstudante").addEventListener("click", function () {
  const numeroSecao = Numero(document.querySelector("#numeroSecao").value);
  cursoBYUI.mudarMatricula(numeroSecao);
  renderizarSecoes(cursoBYUI.secoes);
});
        
document.querySelector("#removerEstudante").addEventListener("click", function () {
  const numeroSecao = Numero(document.querySelector("#numeroSecao").value);
  cursoBYUI.mudarMatricula(numeroSecao, false);
  renderizarSecoes(cursoBYUI.secoes);
});

definirTitulo(cursoBYUI);
definirSecaoSelecionada(cursoBYUI.secoes);
renderizarSecoes(cursoBYUI.secoes);