export async function buscarMembros() {
    const resposta = await fetch("./dados/membros.json");
    if (!resposta.ok) {
        throw new Error("Não foi possível carregar os dados dos membros.");
    }
    return await resposta.json();
}