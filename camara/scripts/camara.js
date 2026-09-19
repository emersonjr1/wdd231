document.addEventListener("DOMContentLoaded", () => {
    // 1. Menu Responsivo (Hambúrguer)
    const botaoMenu = document.getElementById("botaoMenu");
    const navegacao = document.getElementById("navegacao");

    if (botaoMenu && navegacao) {
        botaoMenu.addEventListener("click", () => {
            navegacao.classList.toggle("ativo");
            botaoMenu.classList.toggle("aberto");

            // Atualiza acessibilidade (aria-expanded)
            const aberto = navegacao.classList.contains("ativo");
            botaoMenu.setAttribute("aria-expanded", aberto);
        });
    }

    // 2. Atualização Automática do Ano no Rodapé
    const anoElemento = document.getElementById("anoAtual");
    if (anoElemento) {
        anoElemento.textContent = new Date().getFullYear();
    }

    // 3. Data e Hora da Última Modificação
    const modifiElemento = document.getElementById("ultimaModificacao");
    if (modifiElemento) {
        modifiElemento.textContent = `Última modificação: ${document.lastModified}`;
    }
});