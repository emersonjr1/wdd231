const cursos = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 1, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 1, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 1, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 1, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 1, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 1, completed: false }
];

const courseDetails = {
    btnCSE110: {
        title: "CSE 110 - Introdução à Programação",
        description: "Conceitos básicos de lógica de programação, variáveis, estruturas condicionais e loops utilizando Python.",
        credits: 2
    },
    btnWDD130: {
        title: "WDD 130 - Web Fundamentals",
        description: "Fundamentos de desenvolvimento web focados na criação de páginas semânticas em HTML e estilização avançada com CSS.",
        credits: 2
    },
    btnCSE111: {
        title: "CSE 111 - Funções de Programação",
        description: "Aprofundamento na escrita de funções modulares, testes unitários e tratamento de exceções.",
        credits: 2
    },
    btnCSE210: {
        title: "CSE 210 - Programação Orientada a Objetos",
        description: "Conceitos de POO: classes, objetos, herança, polimorfismo e encapsulamento na prática.",
        credits: 2
    },
    btnWDD131: {
        title: "WDD 131 - Web Development I",
        description: "Criação de sites dinâmicos utilizando JavaScript puro, manipulação da DOM e noções de design responsivo.",
        credits: 2
    },
    btnWDD231: {
        title: "WDD 231 - Frontend Web Development I",
        description: "Desenvolvimento avançado com consumo de APIs assíncronas (fetch), manipulação de dados JSON e otimização.",
        credits: 2
    }
};

const containerCursos = document.getElementById('container-cursos');
const totalCreditos = document.getElementById('total-creditos');

const modal = document.querySelector('#cursoModal');
const btnFecharDialog = document.querySelector('#btnFecharDialog'); // CORRIGIDO: adicionado '#'

const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescricao');
const modalCredits = document.querySelector('#modalCredits');

function renderizarCursos(listaCursos) {
    containerCursos.innerHTML = '';
    
    listaCursos.forEach(curso => {
        const card = document.createElement('div');
        card.classList.add('curso-card', curso.completed ? 'concluido' : 'pendente');
        card.innerHTML = `<button class="btn-Modal" id="btn${curso.subject}${curso.number}"> ${curso.subject} ${curso.number}</button>`;
        containerCursos.appendChild(card);
    });

    const somaCreditos = listaCursos.reduce((acc, curso) => acc + curso.credits, 0);
    totalCreditos.textContent = `O total de créditos pelos cursos exibidos é: ${somaCreditos}`;

    configurarEventosModal();
}

function configurarEventosModal() {
    const modalButtons = document.querySelectorAll('.btn-Modal');
    
    modalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = button.id;
            const dictcursos = courseDetails[buttonId];

            // CORRIGIDO: alterado 'if(curso)' para 'if(dictcursos)'
            if (dictcursos) {
                modalTitle.textContent = dictcursos.title;
                modalDescription.textContent = dictcursos.description;
                modalCredits.textContent = `Créditos: ${dictcursos.credits}`;
                modal.showModal();
            }
        });
    });
}

// Evento para fechar o modal
if (btnFecharDialog) {
    btnFecharDialog.addEventListener('click', () => {
        modal.close();
    });
}

// Filtros de eventos
document.getElementById('todos').addEventListener('click', () => renderizarCursos(cursos));
document.getElementById('cse').addEventListener('click', () => renderizarCursos(cursos.filter(c => c.subject === 'CSE')));
document.getElementById('wdd').addEventListener('click', () => renderizarCursos(cursos.filter(c => c.subject === 'WDD')));

// Inicialização da visualização
renderizarCursos(cursos);