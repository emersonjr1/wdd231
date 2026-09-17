// Exibir ano atual dinamicamente
document.getElementById("anoAtual").textContent = new Date().getFullYear();

// Exibir última modificação
document.getElementById("ultimaModificacao").textContent = `Última Modificação: ${document.lastModified}`;