document.addEventListener("DOMContentLoaded", () => {
    if (!state || !state.currentUser) {
        state.currentUser = localStorage.getItem('agenda_current_user');
        if (!state.currentUser) return;
    }

    // Captura o ID da tarefa passado na URL (?id=xxxx)
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');
    if (!taskId) {
        window.location.href = 'dashboard.html';
        return;
    }

    let tasks = storage.getUserTasks(state.currentUser);
    let task = tasks.find(t => t.id === taskId);
    if (!task) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Inicializa a lista de integrantes com os dados salvos da tarefa
    let editSelectedMembers = task.members || [];

    // Captura os elementos do formulário de edição
    const editCategoryInput = document.getElementById('edit-task-category');
    const catButtons = document.querySelectorAll('.cat-edit-btn');
    const titleInput = document.getElementById('edit-task-title');
    const locationInput = document.getElementById('edit-task-location');
    const dateInput = document.getElementById('edit-task-date');
    const hourInput = document.getElementById('edit-task-hour');
    const minuteInput = document.getElementById('edit-task-minute');
    const descInput = document.getElementById('edit-task-desc');

    // Preenche os dados nos inputs comuns
    if (titleInput) titleInput.value = task.title;
    if (locationInput) locationInput.value = task.location || '';
    if (dateInput) dateInput.value = task.date;
    if (descInput) descInput.value = task.desc || '';

    // Separa o horário padrão (HH:MM) nos dois campos numéricos
    if (task.time && task.time.includes(':')) {
        const [h, m] = task.time.split(':');
        if (hourInput) hourInput.value = parseInt(h, 10);
        if (minuteInput) minuteInput.value = parseInt(m, 10);
    }

    // Marca o botão da categoria correspondente como ativo
    if (editCategoryInput) {
        editCategoryInput.value = task.category || 'Outro';
        catButtons.forEach(btn => {
            if (btn.getAttribute('data-cat') === task.category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Alternar dinamicamente as categorias na edição
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (editCategoryInput) {
                editCategoryInput.value = btn.getAttribute('data-cat');
            }
        });
    });

    // Gerenciador de Tags de Integrantes na Edição
    const memberInput = document.getElementById('edit-member-input');
    const addMemberBtn = document.getElementById('edit-add-member-btn');
    const membersTagsList = document.getElementById('edit-members-tags-list');

    function renderEditTags() {
        if (!membersTagsList) return;
        membersTagsList.innerHTML = '';
        editSelectedMembers.forEach((member, index) => {
            const tag = document.createElement('span');
            tag.className = 'tag-item';
            tag.innerHTML = `${member} <button type="button" class="remove-edit-tag-btn" data-index="${index}">&times;</button>`;
            membersTagsList.appendChild(tag);
        });

        document.querySelectorAll('.remove-edit-tag-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'), 10);
                editSelectedMembers.splice(idx, 1);
                renderEditTags();
            });
        });
    }

    if (addMemberBtn && memberInput) {
        addMemberBtn.addEventListener('click', () => {
            const name = memberInput.value.trim();
            if (name && !editSelectedMembers.includes(name)) {
                editSelectedMembers.push(name);
                memberInput.value = '';
                renderEditTags();
            }
        });
    }

    // Mostra as tags que já estavam salvas na tarefa
    renderEditTags();

    // --- SUBMISSÃO E ATUALIZAÇÃO DA TAREFA MODIFICADA ---
    const taskEditForm = document.getElementById('task-edit-form');
    if (taskEditForm) {
        taskEditForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const hour = hourInput ? String(hourInput.value).padStart(2, '0') : '00';
            const minute = minuteInput ? String(minuteInput.value).padStart(2, '0') : '00';
            const category = editCategoryInput ? editCategoryInput.value : 'Outro';

            // Mapeia as atualizações mantendo o ID original intacto
            tasks = tasks.map(t => t.id === taskId ? {
                ...t,
                category: category,
                title: titleInput ? titleInput.value.trim() : '',
                location: locationInput ? locationInput.value.trim() : '',
                date: dateInput ? dateInput.value : '',
                time: `${hour}:${minute}`,
                desc: descInput ? descInput.value.trim() : '',
                members: [...editSelectedMembers]
            } : t);

            storage.saveUserTasks(state.currentUser, tasks);
            alert('Atividade alterada com sucesso!');
            window.location.href = 'dashboard.html';
        });
    }

    // Configura o comportamento do botão Cancelar
    document.querySelectorAll('.cancel-to-list').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    });
});