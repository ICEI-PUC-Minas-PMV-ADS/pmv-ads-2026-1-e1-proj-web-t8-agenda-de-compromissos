document.addEventListener("DOMContentLoaded", () => {
    // Garante que o estado global e o usuário estejam carregados
    if (!state || !state.currentUser) {
        // Se o shared.js ainda não carregou o user no state, busca direto do localStorage
        state.currentUser = localStorage.getItem('agenda_current_user');
        if (!state.currentUser) return;
    }

    let selectedMembers = [];
    const taskCategoryInput = document.getElementById('task-category');
    const catButtons = document.querySelectorAll('.cat-btn');

    // Alternar categorias de botões visuais
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (taskCategoryInput) {
                taskCategoryInput.value = btn.getAttribute('data-cat');
            }
        });
    });

    // Gerenciamento de Integrantes (Tags)
    const memberInput = document.getElementById('member-input');
    const addMemberBtn = document.getElementById('add-member-btn');
    const membersTagsList = document.getElementById('members-tags-list');

    function renderTags() {
        if (!membersTagsList) return;
        membersTagsList.innerHTML = '';
        selectedMembers.forEach((member, index) => {
            const tag = document.createElement('span');
            tag.className = 'tag-item';
            tag.innerHTML = `${member} <button type="button" class="remove-tag-btn" data-index="${index}">&times;</button>`;
            membersTagsList.appendChild(tag);
        });

        // Adiciona evento de clique para remover as tags criadas
        document.querySelectorAll('.remove-tag-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                selectedMembers.splice(idx, 1);
                renderTags();
            });
        });
    }

    if (addMemberBtn && memberInput) {
        addMemberBtn.addEventListener('click', () => {
            const name = memberInput.value.trim();
            if (name && !selectedMembers.includes(name)) {
                selectedMembers.push(name);
                memberInput.value = '';
                renderTags();
            }
        });
    }

    // --- CORREÇÃO DA SUBMISSÃO DO FORMULÁRIO ---
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const hourInput = document.getElementById('task-hour');
            const minuteInput = document.getElementById('task-minute');
            const titleInput = document.getElementById('task-title');
            const locationInput = document.getElementById('task-location');
            const dateInput = document.getElementById('task-date');
            const descInput = document.getElementById('task-desc');

            const hour = hourInput ? String(hourInput.value).padStart(2, '0') : '00';
            const minute = minuteInput ? String(minuteInput.value).padStart(2, '0') : '00';
            const category = taskCategoryInput ? taskCategoryInput.value : 'Outro';

            // Monta o objeto exatamente na estrutura que o seu app antigo usava
            const newTask = {
                id: '_' + Math.random().toString(36).substr(2, 9),
                category: category,
                title: titleInput ? titleInput.value.trim() : '',
                location: locationInput ? locationInput.value.trim() : '',
                date: dateInput ? dateInput.value : '',
                time: `${hour}:${minute}`,
                desc: descInput ? descInput.value.trim() : '',
                members: [...selectedMembers],
                deleted: false,
                createdAt: new Date().toISOString()
            };

            // Salva utilizando a estrutura global do shared.js
            try {
                const currentTasks = storage.getUserTasks(state.currentUser);
                currentTasks.push(newTask);
                storage.saveUserTasks(state.currentUser, currentTasks);

                alert('Tarefa agendada com sucesso!');
                // Redireciona para o dashboard que está na mesma pasta html/
                window.location.href = 'dashboard.html';
            } catch (error) {
                console.error("Erro ao salvar a tarefa:", error);
                alert("Erro ao salvar a tarefa. Por favor, tente novamente.");
            }
        });
    }
});