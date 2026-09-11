const cursos = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 1, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 1, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 1, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 1, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 1, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 1, completed: false }
];

const containerCursos = document.getElementById('container-cursos');
const totalCreditos = document.getElementById('total-creditos');

function renderizarCursos(listaCursos) {
    containerCursos.innerHTML = '';
    
    listaCursos.forEach(curso => {
        const card = document.createElement('div');
        card.classList.add('curso-card', curso.completed ? 'concluido' : 'pendente');
        card.textContent = `${curso.subject} ${curso.number}`;
        containerCursos.appendChild(card);
    });

    const somaCreditos = listaCursos.reduce((acc, curso) => acc + curso.credits, 0);
    totalCreditos.textContent = `O total de créditos pelos cursos exibidos é: ${somaCreditos}`;
}

// Filtros de eventos
document.getElementById('todos').addEventListener('click', () => renderizarCursos(cursos));
document.getElementById('cse').addEventListener('click', () => {
    renderizarCursos(cursos.filter(c => c.subject === 'CSE'));
});
document.getElementById('wdd').addEventListener('click', () => {
    renderizarCursos(cursos.filter(c => c.subject === 'WDD'));
});

// Inicialização da visualização
renderizarCursos(cursos);