const cursoBYUI = {
  codigo: "WDD231",
  nome: "Desenvolvimento Frontend para Web I",
  secoes: [
    {
      numeroSecao: 1,
      matriculados: 88,
      instrutor: "Irmão Silva",
    },
    {
      numeroSecao: 2,
      matriculados: 81,
      instrutor: "Irmã Pinheiro",
    },
    {
      numeroSecao: 3,
      matriculados: 95,
      instrutor: "Irmã Oliveira",
    },
  ],
  mudarMatriculas: function (numeroSecao, add = true) {
    // Find the section with the given section number
    const indiceSecao = this.secoes.findIndex(
      (secao) => secao.numeroSecao == numeroSecao
    );
    if (indiceSecao >= 0) {
      if (add) {
        this.secoes[indiceSecao].matriculados++;
      } else {
        this.secoes[indiceSecao].matriculados--;
      }
    }
  },
};

export default cursoBYUI;