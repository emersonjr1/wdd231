/**
 * Renderiza a lista de membros no container especificado.
 * @param {Array} membros Lista de membros vinda do JSON.
 * @param {HTMLElement} container Elemento container do DOM.
 */
export function renderizarMembros(membros, container) {
    if (!container) return;
    container.innerHTML = "";

    membros.forEach(membro => {
        const cartao = document.createElement("article");
        cartao.className = "card-membro";

        const niveis = { 1: "Bronze", 2: "Prata", 3: "Ouro" };
        const nivelTexto = niveis[membro.nivelAssociacao] || "Membro";

        cartao.innerHTML = `
            <img src="./imagens/${membro.imagem}" alt="Logo de ${membro.nomeEmpresa}" loading="lazy">
            <div class="info-membro">
                <h3>${membro.nomeEmpresa}</h3>
                <span class="badge badge-nivel-${membro.nivelAssociacao}">${nivelTexto}</span>
                <p class="ramo"><strong>Ramo:</strong> ${membro.ramoAtuacao}</p>
                <p class="endereco">${membro.endereco}</p>
                <p class="telefone"><strong>Tel:</strong> ${membro.telefone}</p>
                <a href="${membro.website}" target="_blank" rel="noopener" class="btn-website">Acessar Website</a>
            </div>
        `;

        container.appendChild(cartao);
    });
}