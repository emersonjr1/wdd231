const menuBotao = document.querySelector('#menu');
const navegacao = document.querySelector('.navegacao');

menuBotao.addEventListener('click', () => {
    navegacao.classList.toggle('open');
    menuBotao.classList.toggle('open');
});