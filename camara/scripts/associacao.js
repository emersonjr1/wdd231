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