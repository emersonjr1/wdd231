import { cursosData } from './cursos.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

let allCourses = [];
let savedCourses = JSON.parse(localStorage.getItem('devacademy_saved')) || [];
let userCertificates = JSON.parse(localStorage.getItem('devacademy_certs')) || [
    { id: 1, title: 'Fundamentos de HTML5 e CSS3', platform: 'DevAcademy', date: '2025-11-15', credentialId: 'CERT-98234', category: 'Frontend' },
    { id: 2, title: 'JavaScript Essencial para Web', platform: 'DevAcademy', date: '2026-01-20', credentialId: 'CERT-44129', category: 'Frontend' }
];

async function initApp() {
    setupMobileMenu();
    setupSmoothScroll();
    setupTabs();
    setupEventListeners();
    loadCoursesData();
    renderSavedCourses();
    renderCertificates();
    updateDashboardMetrics();
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });
}

function loadCoursesData() {
    allCourses = cursosData;
    renderCourses(allCourses);
}

function renderCourses(courses) {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;
    
    if (courses.length === 0) {
        grid.innerHTML = '<p class="no-results">Nenhum curso encontrado com os filtros selecionados.</p>';
        return;
    }

    grid.innerHTML = courses.map(course => {
        const isSaved = savedCourses.some(c => c.id === course.id);
        return `
            <div class="course-card" data-category="${course.category}" data-level="${course.level}">
                <div class="course-header">
                    <span class="badge badge-category">${course.category}</span>
                    <span class="badge badge-level">${course.level}</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-desc">${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-laptop-code"></i> ${course.platform}</span>
                </div>
                <div class="course-footer">
                    <button class="btn btn-secondary btn-sm" onclick="openCourseModal(${course.id})">Ver Ementa</button>
                    <button class="btn ${isSaved ? 'btn-accent' : 'btn-outline'} btn-sm" onclick="toggleSaveCourse(${course.id})">
                        <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i> ${isSaved ? 'Salvo' : 'Salvar'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');

    const filterHandler = () => {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : 'all';
        const level = levelFilter ? levelFilter.value : 'all';

        const filtered = allCourses.filter(course => {
            const matchesQuery = course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query);
            const matchesCategory = category === 'all' || course.category === category;
            const matchesLevel = level === 'all' || course.level === level;
            return matchesQuery && matchesCategory && matchesLevel;
        });

        renderCourses(filtered);
    };

    if (searchInput) searchInput.addEventListener('input', filterHandler);
    if (categoryFilter) categoryFilter.addEventListener('change', filterHandler);
    if (levelFilter) levelFilter.addEventListener('change', filterHandler);

    const modal = document.getElementById('courseModal');
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    const certModal = document.getElementById('certModal');
    const addCertBtn = document.getElementById('addCertBtn');
    const closeCertModal = document.querySelector('.close-cert-modal');
    const certForm = document.getElementById('certForm');

    if (addCertBtn && certModal) {
        addCertBtn.addEventListener('click', () => certModal.style.display = 'block');
    }
    if (closeCertModal && certModal) {
        closeCertModal.addEventListener('click', () => certModal.style.display = 'none');
    }
    if (certForm) {
        certForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newCert = {
                id: Date.now(),
                title: document.getElementById('certTitle').value,
                platform: document.getElementById('certPlatform').value,
                date: document.getElementById('certDate').value,
                credentialId: document.getElementById('certId').value || 'N/A',
                category: document.getElementById('certCategory').value
            };
            userCertificates.push(newCert);
            localStorage.setItem('devacademy_certs', JSON.stringify(userCertificates));
            renderCertificates();
            updateDashboardMetrics();
            certForm.reset();
            if (certModal) certModal.style.display = 'none';
            showToast('Certificado adicionado com sucesso!');
        });
    }
}

window.openCourseModal = function(id) {
    const course = allCourses.find(c => c.id === id);
    if (!course) return;

    const modal = document.getElementById('courseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (modalTitle) modalTitle.textContent = course.title;
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="modal-info-grid">
                <p><strong>Categoria:</strong> <span class="badge badge-category">${course.category}</span></p>
                <p><strong>Nível:</strong> <span class="badge badge-level">${course.level}</span></p>
                <p><strong>Duração:</strong> ${course.duration}</p>
                <p><strong>Plataforma:</strong> ${course.platform}</p>
            </div>
            <p style="margin-top: 15px;"><strong>Descrição:</strong> ${course.description}</p>
            <h4 style="margin-top: 20px; color: var(--primary-color);">Ementa do Curso:</h4>
            <ul class="syllabus-list">
                ${course.syllabus.map(item => `<li><i class="fas fa-check-circle" style="color: var(--secondary-color);"></i> ${item}</li>`).join('')}
            </ul>
        `;
    }
    if (modal) modal.style.display = 'block';
};

window.toggleSaveCourse = function(id) {
    const course = allCourses.find(c => c.id === id);
    if (!course) return;

    const index = savedCourses.findIndex(c => c.id === id);
    if (index > -1) {
        savedCourses.splice(index, 1);
        showToast('Curso removido dos salvos.');
    } else {
        savedCourses.push(course);
        showToast('Curso salvo com sucesso!');
    }
    localStorage.setItem('devacademy_saved', JSON.stringify(savedCourses));
    renderCourses(allCourses);
    renderSavedCourses();
    updateDashboardMetrics();
};

window.deleteCertificate = function(id) {
    userCertificates = userCertificates.filter(c => c.id !== id);
    localStorage.setItem('devacademy_certs', JSON.stringify(userCertificates));
    renderCertificates();
    updateDashboardMetrics();
    showToast('Certificado removido.');
};

function renderSavedCourses() {
    const container = document.getElementById('savedCoursesContainer');
    if (!container) return;

    if (savedCourses.length === 0) {
        container.innerHTML = '<p class="empty-state">Você ainda não salvou nenhum curso. Explore o catálogo e clique em "Salvar".</p>';
        return;
    }

    container.innerHTML = savedCourses.map(course => `
        <div class="saved-item">
            <div>
                <h4>${course.title}</h4>
                <small>${course.platform} • ${course.duration} • <span class="badge badge-level">${course.level}</span></small>
            </div>
            <button class="btn btn-outline btn-sm" onclick="toggleSaveCourse(${course.id})"><i class="fas fa-trash-alt"></i> Remover</button>
        </div>
    `).join('');
}

function renderCertificates() {
    const grid = document.getElementById('certificatesGrid');
    if (!grid) return;

    if (userCertificates.length === 0) {
        grid.innerHTML = '<p class="empty-state">Nenhum certificado cadastrado. Clique em "Adicionar Certificado" para começar.</p>';
        return;
    }

    grid.innerHTML = userCertificates.map(cert => `
        <div class="cert-card">
            <div class="cert-badge"><i class="fas fa-award"></i></div>
            <div class="cert-info">
                <h4>${cert.title}</h4>
                <p><strong>Plataforma:</strong> ${cert.platform} | <strong>Data:</strong> ${cert.date}</p>
                <p><small>ID da Credencial: ${cert.credentialId}</small></p>
                <span class="badge badge-category">${cert.category}</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="deleteCertificate(${cert.id})" title="Excluir"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

function updateDashboardMetrics() {
    const totalCoursesEl = document.getElementById('totalCoursesCount');
    const savedCountEl = document.getElementById('savedCount');
    const certCountEl = document.getElementById('certCount');

    if (totalCoursesEl) totalCoursesEl.textContent = allCourses.length;
    if (savedCountEl) savedCountEl.textContent = savedCourses.length;
    if (certCountEl) certCountEl.textContent = userCertificates.length;
}

function showToast(message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}