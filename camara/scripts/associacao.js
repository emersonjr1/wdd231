// Preenche a data e hora do campo oculto no carregamento
document.getElementById('timestamp').value = new Date().toISOString();

// Controle dos Modais
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    document.getElementById(modalId).showModal();
  });
});

document.querySelectorAll('.close-modal').forEach(button => {
  button.addEventListener('click', () => {
    button.closest('dialog').close();
  });
});

const cards = document.querySelectorAll('.card.card-animated')

let indiceAtual = 0

function rodarBanner(){
  //Remover o "Ativo"

  cards[indiceAtual].classList.remove('ativo');

  //faz a divisão e pega o restante mais proximo ex. 1 % 3 = falta 1 para chegar no 1. (Modulo)
  indiceAtual= (indiceAtual + 1) % cards.length;



  cards[indiceAtual].classList.add('ativo');


}

setInterval(rodarBanner,5000);