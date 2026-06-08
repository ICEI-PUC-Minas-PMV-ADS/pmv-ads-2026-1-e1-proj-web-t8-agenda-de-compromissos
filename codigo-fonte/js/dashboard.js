document.addEventListener("DOMContentLoaded", () => {
    if (!state.currentUser) return;

    const dom = {
        calendarTitle: document.getElementById('calendar-title'),
        prevPeriod: document.getElementById('prev-period'),
        nextPeriod: document.getElementById('next-period'),
        monthCalendar: document.getElementById('month-calendar'),
        weekCalendar: document.getElementById('week-calendar'),
        dayCalendar: document.getElementById('day-calendar'),
        viewButtons: document.querySelectorAll('.view-btn')
    };

        // --- CONTROLO DE ALTERNÂNCIA DE ABAS EXCLUSIVAS ---
    dom.viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Atualiza o estado dos botões de navegação superiores
            dom.viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentView = btn.getAttribute('data-view');
            
            // 2. Garante que as três estruturas recebam a classe hidden para sumirem
            if (dom.monthCalendar) dom.monthCalendar.classList.add('hidden');
            if (dom.weekCalendar) dom.weekCalendar.classList.add('hidden');
            if (dom.dayCalendar) dom.dayCalendar.classList.add('hidden');
            
            // 3. Remove o hidden APENAS da tela selecionada para que ela apareça isolada
            const activeCalendar = document.getElementById(`${state.currentView}-calendar`);
            if (activeCalendar) {
                activeCalendar.classList.remove('hidden');
            }
            
            // 4. Renderiza puramente o conteúdo da aba escolhida
            renderCalendar();
        });
    });

    // --- NAVEGAÇÃO DE PERÍODOS (SETAS ◀ E ▶) ---
    dom.prevPeriod.addEventListener('click', () => shiftPeriod(-1));
    dom.nextPeriod.addEventListener('click', () => shiftPeriod(1));

    function shiftPeriod(direction) {
        if (state.currentView === 'month') state.currentDate.setMonth(state.currentDate.getMonth() + direction);
        if (state.currentView === 'week') state.currentDate.setDate(state.currentDate.getDate() + (direction * 7));
        if (state.currentView === 'day') state.currentDate.setDate(state.currentDate.getDate() + direction);
        renderCalendar();
    }

    function getActiveTasks() {
        return storage.getUserTasks(state.currentUser).filter(t => !t.deleted);
    }

    function createTaskBadge(task) {
        const badge = document.createElement('div');
        badge.className = 'task-item-badge';
        const emojis = { Viagem: '✈️', Café: '☕', Almoço: '🍛', Job: '💼', Lazer: '🚲', Outro: '➕' };
        badge.innerText = `${emojis[task.category] || ''} ${task.time} - ${task.title}`;
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `edit_tasks.html?id=${task.id}`;
        });
        return badge;
    }

    function renderCalendar() {
        const tasks = getActiveTasks();
        if (state.currentView === 'month') renderMonthView(tasks);
        if (state.currentView === 'week') renderWeekView(tasks);
        if (state.currentView === 'day') renderDayView(tasks);
    }

    // --- 1. RENDERIZAR APENAS MÊS ---
    function renderMonthView(tasks) {
        if (!dom.monthCalendar) return;
        dom.monthCalendar.innerHTML = ''; // Limpa resíduos visuais
        
        const year = state.currentDate.getFullYear();
        const month = state.currentDate.getMonth();
        dom.calendarTitle.innerText = state.currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase();

        const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        weekdays.forEach(day => {
            const header = document.createElement('div');
            header.className = 'cell-header weekday';
            header.innerText = day;
            dom.monthCalendar.appendChild(header);
        });

        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayIndex; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-cell empty';
            dom.monthCalendar.appendChild(emptyCell);
        }

        for (let day = 1; day <= totalDays; day++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-cell';
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            const cellHeader = document.createElement('div');
            cellHeader.className = 'cell-header';
            cellHeader.innerText = day;
            cell.appendChild(cellHeader);

            tasks.filter(t => t.date === dateStr)
                 .sort((a,b) => a.time.localeCompare(b.time))
                 .forEach(t => cell.appendChild(createTaskBadge(t)));

            dom.monthCalendar.appendChild(cell);
        }
    }

    // --- 2. RENDERIZAR APENAS SEMANA ---
    function renderWeekView(tasks) {
        if (!dom.weekCalendar) return;
        dom.weekCalendar.innerHTML = ''; // Limpa resíduos visuais

        const startOfWeek = new Date(state.currentDate);
        startOfWeek.setDate(state.currentDate.getDate() - state.currentDate.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        dom.calendarTitle.innerText = `${startOfWeek.getDate()} - ${endOfWeek.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}`.toUpperCase();

        const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(startOfWeek);
            currentDay.setDate(startOfWeek.getDate() + i);

            const cell = document.createElement('div');
            cell.className = 'calendar-cell week-column';
            
            if (currentDay.toDateString() === new Date().toDateString()) {
                cell.classList.add('today-highlight');
            }

            const dateStr = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, '0')}-${String(currentDay.getDate()).padStart(2, '0')}`;

            const cellHeader = document.createElement('div');
            cellHeader.className = 'cell-header';
            cellHeader.innerHTML = `<span class="week-day-label">${weekdays[i]}</span> <span class="week-day-num">${currentDay.getDate()}</span>`;
            cell.appendChild(cellHeader);

            const taskContainer = document.createElement('div');
            taskContainer.className = 'week-task-container';

            tasks.filter(t => t.date === dateStr)
                 .sort((a, b) => a.time.localeCompare(b.time))
                 .forEach(t => taskContainer.appendChild(createTaskBadge(t)));

            cell.appendChild(taskContainer);
            dom.weekCalendar.appendChild(cell);
        }
    }

    // --- 3. RENDERIZAR APENAS DIA ---
    function renderDayView(tasks) {
        if (!dom.dayCalendar) return;
        dom.dayCalendar.innerHTML = ''; // Limpa resíduos visuais

        dom.calendarTitle.innerText = state.currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();

        const dateStr = `${state.currentDate.getFullYear()}-${String(state.currentDate.getMonth() + 1).padStart(2, '0')}-${String(state.currentDate.getDate()).padStart(2, '0')}`;

        const dayContainer = document.createElement('div');
        dayContainer.className = 'day-view-container';

        const dayTasks = tasks.filter(t => t.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));

        if (dayTasks.length === 0) {
            dayContainer.innerHTML = `<p class="no-tasks-msg">✨ Nenhum compromisso agendado para este dia.</p>`;
        } else {
            dayTasks.forEach(task => {
                const item = document.createElement('div');
                item.className = 'day-task-card';
                item.innerHTML = `
                    <span class="day-task-time">⏰ ${task.time}</span>
                    <div class="day-task-info">
                        <h4>[${task.category}] ${task.title}</h4>
                        ${task.location ? `<small>📍 ${task.location}</small>` : ''}
                    </div>
                `;
                item.addEventListener('click', () => {
                    window.location.href = `edit_tasks.html?id=${task.id}`;
                });
                dayContainer.appendChild(item);
            });
        }

        dom.dayCalendar.appendChild(dayContainer);
    }

    // Executa a primeira renderização (padrão Mês) ao entrar na página
    renderCalendar();
});
