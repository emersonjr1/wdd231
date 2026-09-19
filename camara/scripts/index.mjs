import { carregarClima } from "./Modulos/clima.mjs";
import { carregarDestaques } from "./Modulos/destaques/destaques.mjs";

document.addEventListener("DOMContentLoaded", () => {
    carregarClima();
    carregarDestaques();
});