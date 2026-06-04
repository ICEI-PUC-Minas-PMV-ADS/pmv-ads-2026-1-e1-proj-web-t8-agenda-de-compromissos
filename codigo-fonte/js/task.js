document.addEventListener("DOMContentLoaded", () => {
    // Garante que o estado do usuário esteja ativo
    if (!state || !state.currentUser) {
        state.currentUser = localStorage.getItem('agenda_current_user');
        if (!state.currentUser) return;
    }

    const allTasksList = document.getElementById('all-tasks-list');
    if (!allTasksList) return;

    // --- FUNÇÃO PARA RENDERIZAR AS TAREFAS ---
    function renderAllTasksView() {
        allTasksList.innerHTML = '';
        
        // Carrega apenas as tarefas que não foram excluídas do usuário atual
        const tasks = storage.getUserTasks(state.currentUser)
            .filter(t => !t.deleted)
            .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

        if (tasks.length === 0) {
            allTasksList.innerHTML = '<p style="color: var(--text-muted); padding: 1rem;">Nenhuma tarefa ativa cadastrada.</p>';
            return;
        }

        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'task-card';
            card.innerHTML = `
                <div>
                    <strong style="color: var(--primary-color);">[${task.category}] ${task.title}</strong>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">📅 ${task.date} às ⏰ ${task.time}</p>
                </div>
                <div class="task-card-actions">
                    <button class="edit-btn-nav" data-id="${task.id}" style="background: var(--secondary-color); color: #fff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: bold;">Editar</button>
                    <button class="trash-trigger-btn" data-id="${task.id}" style="background: var(--danger-color); color: #fff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: bold; margin-left: 10px;">Excluir</button>
                </div>`;
            
            allTasksList.appendChild(card);
        });

        // --- ATRIBUIÇÃO DOS EVENTOS DE CLIQUE (Substitui o antigo onclick) ---
        
        // Captura todos os botões de Excluir criados na tela
        document.querySelectorAll('.trash-trigger-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                moveToTrash(id);
            });
        });

        // Captura todos os botões de Editar criados na tela
        document.querySelectorAll('.edit-btn-nav').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                window.location.href = `edit_tasks.html?id=${id}`;
            });
        });
    }

    // --- FUNÇÃO CORRIGIDA PARA ENVIAR À LIXEIRA ---
    function moveToTrash(id) {
        let tasks = storage.getUserTasks(state.currentUser);
        
        // Altera a propriedade deleted para true na tarefa correspondente
        tasks = tasks.map(t => t.id === id ? { ...t, deleted: true } : t);
        
        // Salva de volta no LocalStorage
        storage.saveUserTasks(state.currentUser, tasks);
        
        // Atualiza o contador numérico da sidebar (função que está no shared.js)
        if (typeof updateTrashCount === 'function') {
            updateTrashCount();
        }
        
        // Recarrega a lista da tela para sumir com o card excluído
        renderAllTasksView();
    }

    // Dispara a montagem inicial da lista
    renderAllTasksView();
});