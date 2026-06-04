// Objeto global para gerenciar os timers de exclusão
const timersDeRemocao = {};
let bancoDeDadosLocal = []; // Cache local para permitir a pesquisa em tempo real

document.addEventListener('DOMContentLoaded', () => {
    // 1. Configura o Listener da Barra de Pesquisa pelo Título
    const campoPesquisa = document.querySelector('.search-bar input');
    if (campoPesquisa) {
        campoPesquisa.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            processarTarefas(termo);
        });
    }

    carregarDadosIniciais();
});

function carregarDadosIniciais() {
    bancoDeDadosLocal = JSON.parse(localStorage.getItem('tarefasApp')) || [];
    processarTarefas(""); // Inicializa a tela com todas as tarefas
}

function processarTarefas(filtroTitulo) {
    const agora = new Date().getTime();

    // 2. Filtra as tarefas pelo TITULO e calcula o tempo para início
    const tarefasFiltradas = bancoDeDadosLocal
        .filter(tarefa => tarefa.titulo.toLowerCase().includes(filtroTitulo))
        .map(tarefa => {
            const dataInicio = new Date(`${tarefa.prazo}T${tarefa.horario}:00`).getTime();
            const tempoAteInicio = dataInicio - agora;
            return { ...tarefa, tempoAteInicio };
        });

    // Ordena da mais próxima para a mais distante
    tarefasFiltradas.sort((a, b) => a.tempoAteInicio - b.tempoAteInicio);

    // 3. Renderiza as colunas de Urgência
    renderizarColunasUrgencia(tarefasFiltradas);

    // 4. Renderiza o resumo superior (Hoje e Amanhã)
    renderizarResumoSuperior(tarefasFiltradas);
}

function renderizarColunasUrgencia(tarefas) {
    const colunas = {
        alta: document.getElementById('altaUrge'),
        media: document.getElementById('mediaUrge'),
        baixa: document.getElementById('baixaUrge')
    };
    
    Object.values(colunas).forEach(c => { if(c) c.innerHTML = ""; });

    tarefas.forEach(tarefa => {
        const card = criarCard(tarefa);
        const horasParaInicio = tarefa.tempoAteInicio / (1000 * 60 * 60);

        if (tarefa.tempoAteInicio < 0 || horasParaInicio <= 24) {
            if(colunas.alta) colunas.alta.appendChild(card);
        } else if (horasParaInicio <= 72) {
            if(colunas.media) colunas.media.appendChild(card);
        } else {
            // Aqui caem as tarefas de longo prazo e rotinas
            if(colunas.baixa) colunas.baixa.appendChild(card);
        }
    });
}

function criarCard(tarefa) {
    const div = document.createElement('div');
    div.className = 'task-card';
    div.id = `task-${tarefa.id}`;
    
    let statusTempo = "";
    if (tarefa.tempoAteInicio < 0) {
        statusTempo = `<span style="color: #ef4444; font-weight: bold;">em andamento</span>`;
    } else {
        const hTotal = Math.floor(tarefa.tempoAteInicio / (1000 * 60 * 60));
        const dias = Math.floor(hTotal / 24);
        const horas = hTotal % 24;
        statusTempo = dias > 0 ? `começa em ${dias}d ${horas}h` : `começa em ${horas}h`;
    }

    div.innerHTML = `
        <input type="checkbox" onchange="controlarConclusao(this, ${tarefa.id})">
        <div class="task-info">
            <h4>${tarefa.titulo}</h4>
            <p>📍 ${tarefa.local || 'Sem local'} • ⏰ ${tarefa.horario}</p>
            <p style="font-size: 0.75rem; color: #6366f1; margin-top: 5px; font-weight: 600;">
                ⏳ ${statusTempo}
            </p>
        </div>
    `;
    return div;
}

function controlarConclusao(checkbox, id) {
    const card = document.getElementById(`task-${id}`);

    if (checkbox.checked) {
        card.style.opacity = "0.5";
        card.style.textDecoration = "line-through";
        timersDeRemocao[id] = setTimeout(() => removerDefinitivamente(id), 120); 
    } else {
        if (timersDeRemocao[id]) {
            clearTimeout(timersDeRemocao[id]);
            delete timersDeRemocao[id];
        }
        card.style.opacity = "1";
        card.style.textDecoration = "none";
    }
}

function removerDefinitivamente(id) {
    bancoDeDadosLocal = bancoDeDadosLocal.filter(t => t.id !== id);
    localStorage.setItem('tarefasApp', JSON.stringify(bancoDeDadosLocal));

    const card = document.getElementById(`task-${id}`);
    if (card) {
        card.style.transform = "scale(0.8) opacity(0)";
        setTimeout(() => {
            card.remove();
            processarTarefas(""); // Atualiza as listas e resumo
        }, 500);
    }
}

function renderizarResumoSuperior(tarefas) {
    const hojeList = document.getElementById('hojeList');
    const amanhaList = document.getElementById('amanhaList');
    if (!hojeList || !amanhaList) return;

    hojeList.innerHTML = "";
    amanhaList.innerHTML = "";

    const agora = new Date();
    const hojeStr = agora.toISOString().split('T')[0];
    const amanha = new Date();
    amanha.setDate(agora.getDate() + 1);
    const amanhaStr = amanha.toISOString().split('T')[0];

    tarefas.forEach(t => {
        const item = document.createElement('div');
        item.className = 'mini-item';
        item.innerHTML = `
            <span><span class="dot" style="background: #6366f1"></span>${t.titulo}</span>
            <span class="time">${t.horario}</span>
        `;
        if (t.prazo === hojeStr) hojeList.appendChild(item);
        else if (t.prazo === amanhaStr) amanhaList.appendChild(item);
    });
}