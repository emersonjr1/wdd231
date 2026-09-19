export function filtrarMembrosQualificados(membros) {
    return membros.filter(m => m.nivelAssociacao === 2 || m.nivelAssociacao === 3);
}

export function sortearMembros(lista, quantidade = 3) {
    const embaralhados = [...lista].sort(() => 0.5 - Math.random());
    return embaralhados.slice(0, quantidade);
}