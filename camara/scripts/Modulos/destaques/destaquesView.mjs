export function renderizarDestaques(membros) {
    const container = document.getElementById("cartoesDestaques");
    if (!container) return;

    container.innerHTML = "";

    membros.forEach(m => {
        const card = document.createElement("article");
        card.className = "card-destaque";

        const nivelTexto = m.nivelAssociacao === 3 ? "Ouro" : "Prata";
        const badgeClasse = m.nivelAssociacao === 3 ? "badge-ouro" : "badge-prata";

        card.innerHTML = `
            <span class="${badgeClasse}">Membro ${nivelTexto}</span>
            <h3>${m.nomeEmpresa}</h3>
            <img src="./imagens/${m.imagem}" alt="Logo ${m.nomeEmpresa}">
            <p>${m.endereco}</p>
            <p><strong>Tel:</strong> ${m.telefone}</p>
            <a href="${m.website}" target="_blank" rel="noopener">Visitar Website</a>
        `;
        container.appendChild(card);
    });
}