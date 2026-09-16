


async function obterDados() {
    const resposta = await fetch ("./scripts/membros.json");
    const dados = await resposta.json();
    console.table(dados);     
}

obterDados()