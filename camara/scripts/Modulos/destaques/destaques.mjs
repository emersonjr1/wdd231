import { buscarMembros } from "./membrosApi.mjs";
import { filtrarMembrosQualificados, sortearMembros } from "./membrosUtils.mjs";
import { renderizarDestaques } from "./destaquesView.mjs";

export async function carregarDestaques() {
    try {
        const todosMembros = await buscarMembros();
        const qualificados = filtrarMembrosQualificados(todosMembros);
        const sorteados = sortearMembros(qualificados, 3);
        
        renderizarDestaques(sorteados);
    } catch (erro) {
        console.error("Erro ao carregar membros em destaque:", erro);
    }
}