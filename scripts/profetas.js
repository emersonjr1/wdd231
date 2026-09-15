
const url = "https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json"
const cartoes = document.querySelector('#cartoes');


const exibirProfetas = (profetas)=>{
    profetas.forEach((profeta) => {
        let cartao = document.createElement('section');
        let nomeCompleto = document.createElement("h2");
        let retrato = document.createElement("img");
        let texto = document.createElement("p");

        nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;
        texto.innerHTML = `
            Nascimento: ${profeta.nascimento} <br>
            Lugar: ${profeta.localNascimento} <br>
            Filhos: ${profeta.numeroFilhos} <br>
            Morte: ${profeta.morte} <br>
            Anos de Serviço: ${profeta.duracao} <br>


        `

        //DEFININDO ATRIBUTOS DO RETRATO
        retrato.setAttribute('src', profeta.urlImagem);
        retrato.setAttribute('alt', `Retrato do ${profeta.nome} ${profeta.sobrenome};` );
        retrato.setAttribute('loading', 'lazy');
        retrato.setAttribute('width','340');
        retrato.setAttribute('height','440');
        

        cartao.appendChild(nomeCompleto);
        cartao.appendChild(texto)
        cartao.appendChild(retrato);
        cartoes.appendChild(cartao);
    });
}

const obterDadosDeProfetas = async()=> {
    try {
        const resposta = await fetch("https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json");
        const dados = await resposta.json();
        // console.table(dados);
        exibirProfetas(dados.profetas);


    } catch (erro){
        console.error("Erro ao buscar dados", erro);
    }
}

obterDadosDeProfetas();