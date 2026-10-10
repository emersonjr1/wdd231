import { lugares } from './Modulos/data/lugares.mjs';

document.addEventListener('DOMContentLoaded', () => {
    gerenciarMensagemVisita();
    renderizarCartoes(lugares);
});

// Lógica de verificação do tempo desde a última visita usando localStorage
function gerenciarMensagemVisita() {
    const painelMensagem = document.getElementById('mensagemVisita');
    const chaveUltimaVisita = 'dataUltimaVisitaCamara';
    const agora = Date.now();
    const ultimaVisita = localStorage.getItem(chaveUltimaVisita);

    if (!ultimaVisita) {
        painelMensagem.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
        const diferencaMs = agora - parseInt(ultimaVisita, 10);
        const msPorDia = 1000 * 60 * 60 * 24;
        const diasDiferenca = Math.floor(diferencaMs / msPorDia);

        if (diferencaMs < msPorDia) {
            painelMensagem.textContent = "Já voltou? Que legal!";
        } else if (diasDiferenca === 1) {
            painelMensagem.textContent = "Seu último acesso foi há 1 dia.";
        } else {
            painelMensagem.textContent = `Seu último acesso foi há ${diasDiferenca} dias.`;
        }
    }

    localStorage.setItem(chaveUltimaVisita, agora.toString());
}

// Renderização dos 8 cartões
function renderizarCartoes(itens) {
    const container = document.getElementById('gridCartoes');
    container.innerHTML = '';

    itens.forEach((item, index) => {
        const artigo = document.createElement('article');
        artigo.classList.add('card-item');
        artigo.style.gridArea = `item${index + 1}`;

        artigo.innerHTML = `
            <h2>${item.nome}</h2>
            <figure>
                <img src="${item.imagem}" alt="${item.nome}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.endereco}</address>
            <p>${item.descricao}</p>
            <a href="https://piracicaba.sp.gov.br/">
                <button type="button"  class="btn-saiba-mais">Saiba Mais</button>
            </a>
        `;

        container.appendChild(artigo);
    });
}