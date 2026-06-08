document.addEventListener("DOMContentLoaded", () => {
    // Garante que o estado do usuário esteja ativo
    if (!state || !state.currentUser) {
        state.currentUser = localStorage.getItem('agenda_current_user');
        if (!state.currentUser) return;
    }

    const trashList = document.getElementById('trash-list');
    if (!trashList) return;

    // --- FUNÇÃO PARA RENDERIZAR A LIXEIRA ---
    function renderTrash() {
        trashList.innerHTML = '';
        
        // Carrega apenas as tarefas marcadas como excluídas (deleted: true)
        const tasks = storage.getUserTasks(state.currentUser).filter(t => t.deleted);

        if (tasks.length === 0) {
            trashList.innerHTML = '<p style="color: var(--text-muted); padding: 1rem;">A lixeira está vazia.</p>';
            return;
        }

        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'task-card';
            card.innerHTML = `
                <div>
                    <strong style="color: var(--danger-color);">[${task.category}] ${task.title}</strong> <small style="color: var(--text-muted);">(${task.date} às ${task.time})</small>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">Onde: ${task.location || 'Não definido'}</p>
                </div>
                <div class="task-card-actions">
                    <button class="restore-trigger-btn" data-id="${task.id}" style="background: var(--success-color); color: #fff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: bold;">Restaurar</button>
                    <button class="hard-delete-trigger-btn" data-id="${task.id}" style="background: var(--danger-color); color: #fff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: bold; margin-left: 10px;">Excluir</button>
                </div>
            `;
            trashList.appendChild(card);
        });

        // --- ADICIONANDO ESCUTADORES DE COMPORTAMENTO ---

        // Captura cliques no botão Restaurar
        document.querySelectorAll('.restore-trigger-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                restoreTask(id);
            });
        });

        // Captura cliques no botão Excluir Permanentemente
        document.querySelectorAll('.hard-delete-trigger-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                hardDeleteTask(id);
            });
        });
    }

    // --- FUNÇÃO PARA RESTAURAR DA LIXEIRA ---
    function restoreTask(id) {
        let tasks = storage.getUserTasks(state.currentUser);
        tasks = tasks.map(t => t.id === id ? { ...t, deleted: false } : t);
        storage.saveUserTasks(state.currentUser, tasks);
        
        if (typeof updateTrashCount === 'function') {
            updateTrashCount();
        }
        renderTrash();
    }

    // --- FUNÇÃO PARA DELETAR PARA SEMPRE ---
    function hardDeleteTask(id) {
        if (confirm('Deseja apagar permanentemente esta atividade? Esta ação não pode ser desfeita.')) {
            let tasks = storage.getUserTasks(state.currentUser);
            tasks = tasks.filter(t => t.id !== id);
            storage.saveUserTasks(state.currentUser, tasks);
            
            if (typeof updateTrashCount === 'function') {
                updateTrashCount();
            }
            renderTrash();
        }
    }

    // Executa a primeira listagem ao abrir a tela
    renderTrash();
});