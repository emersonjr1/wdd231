const currentUrl = window.location.href;
const formData = new URLSearchParams(currentUrl.split('?')[1]);

const resultsElement = document.getElementById('results');

// Mapeamento dos nomes dos campos GET com seus rótulos amigáveis
const requiredFields = [
  { key: 'fname', label: 'Nome' },
  { key: 'lname', label: 'Sobrenome' },
  { key: 'email', label: 'E-mail' },
  { key: 'phone', label: 'Telefone Celular' },
  { key: 'organization', label: 'Empresa / Organização' },
  { key: 'timestamp', label: 'Data e Hora de Envio' }
];

requiredFields.forEach(field => {
  if (formData.has(field.key)) {
    let value = formData.get(field.key);
    
    // Formata a data se for o campo timestamp
    if (field.key === 'timestamp' && value) {
      value = new Date(value).toLocaleString('pt-BR');
    }

    const dt = document.createElement('dt');
    dt.textContent = field.label + ':';
    const dd = document.createElement('dd');
    dd.textContent = value;

    resultsElement.appendChild(dt);
    resultsElement.appendChild(dd);
  }
});