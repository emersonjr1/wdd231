import { buscarMembros } from "../destaques/membrosApi.mjs";
import { renderizarMembros } from "./diretorioView.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("membrosContainer");
    const btnGrid = document.getElementById("btnGrid");
    const btnList = document.getElementById("btnList");

    try {
        const membros = await buscarMembros();
        renderizarMembros(membros, container);

        // Alternância entre visualização em Grid e Lista
        if (btnGrid && btnList && container) {
            btnGrid.addEventListener("click", () => {
                container.classList.add("grid-view");
                container.classList.remove("list-view");
                btnGrid.classList.add("ativo");
                btnList.classList.remove("ativo");
            });

            btnList.addEventListener("click", () => {
                container.classList.add("list-view");
                container.classList.remove("grid-view");
                btnList.classList.add("ativo");
                btnGrid.classList.remove("ativo");
            });
        }

    } catch (erro) {
        console.error("Erro ao carregar o diretório:", erro);
        if (container) {
            container.innerHTML = `<p class="erro">Não foi possível carregar os dados dos membros.</p>`;
        }
    }
});