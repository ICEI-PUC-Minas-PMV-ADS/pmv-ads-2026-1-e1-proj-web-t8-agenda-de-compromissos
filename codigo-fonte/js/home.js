const timersDeRemocao = {};
let bancoDeDadosLocal = [];

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosIniciais();
    configurarTrocaDeContainer();
    renderizarMesAtual();
    configurarFiltros();
});

function carregarDadosIniciais() {
    const usuarioAtual = localStorage.getItem('agenda_current_user');

    if (!usuarioAtual) {
        bancoDeDadosLocal = [];
        processarTarefas("");
        return;
    }

    const tarefasDoUsuario = JSON.parse(localStorage.getItem(`tasks_${usuarioAtual}`)) || [];

    bancoDeDadosLocal = tarefasDoUsuario.map(tarefa => {
        return {
            id: tarefa.id,
            titulo: tarefa.title,
            local: tarefa.location,
            prazo: tarefa.date,
            horario: tarefa.time,
            descricao: tarefa.desc,
            categoria: tarefa.category
        };
    });

    processarTarefas("");
}


function processarTarefas(filtroTitulo = "", filtroData = "") {
    const agora = new Date().getTime();

    const temFiltro = filtroTitulo !== "" || filtroData !== "";

    const todasTarefasProcessadas = bancoDeDadosLocal
        .filter(tarefa => {
            return tarefa.titulo && tarefa.prazo;
        })
        .map(tarefa => {
            const dataInicio = new Date(`${tarefa.prazo}T${tarefa.horario || "00:00"}:00`).getTime();
            const tempoAteInicio = dataInicio - agora;

            return {
                ...tarefa,
                tempoAteInicio
            };
        });

    todasTarefasProcessadas.sort((a, b) => a.tempoAteInicio - b.tempoAteInicio);

    const tarefasFiltradas = todasTarefasProcessadas.filter(tarefa => {
        const titulo = tarefa.titulo.toLowerCase();

        const bateTitulo =
            filtroTitulo === "" ||
            titulo.includes(filtroTitulo.toLowerCase());

        const bateData =
            filtroData === "" ||
            tarefa.prazo === filtroData;

        return bateTitulo && bateData;
    });

    if (temFiltro) {
        renderizarResultadoPesquisa(tarefasFiltradas);
    } else {
        mostrarSecoesPrioridade();
        renderizarTarefasPorUrgencia(todasTarefasProcessadas);
    }

    renderizarResumoDia(todasTarefasProcessadas);
}

function renderizarTarefasPorUrgencia(tarefas) {
    const altaUrge = document.getElementById('altaUrge');
    const mediaUrge = document.getElementById('mediaUrge');
    const baixaUrge = document.getElementById('baixaUrge');

    if (!altaUrge || !mediaUrge || !baixaUrge) return;

    altaUrge.innerHTML = "";
    mediaUrge.innerHTML = "";
    baixaUrge.innerHTML = "";

    tarefas.forEach(tarefa => {
        const card = criarCardTarefa(tarefa);
        const horasParaInicio = tarefa.tempoAteInicio / (1000 * 60 * 60);

        if (tarefa.tempoAteInicio < 0 || horasParaInicio <= 24) {
            altaUrge.appendChild(card);
        } else if (horasParaInicio <= 72) {
            mediaUrge.appendChild(card);
        } else {
            baixaUrge.appendChild(card);
        }
    });
}

function criarCardTarefa(tarefa) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.id = `task-${tarefa.id}`;

    let statusTempo = "";

    if (tarefa.tempoAteInicio < 0) {
        statusTempo = `<span class="status-andamento">em andamento</span>`;
    } else {
        const horasTotais = Math.floor(tarefa.tempoAteInicio / (1000 * 60 * 60));
        const dias = Math.floor(horasTotais / 24);
        const horas = horasTotais % 24;

        if (dias > 0) {
            statusTempo = `começa em ${dias}d ${horas}h`;
        } else {
            statusTempo = `começa em ${horas}h`;
        }
    }

    card.innerHTML = `
        <input 
            type="checkbox" 
            onchange="controlarConclusao(this, '${tarefa.id}')"
        >

        <div class="task-info">
            <h3>${tarefa.titulo}</h3>
            <p>📍 ${tarefa.local || 'Sem local'} • ⏰ ${tarefa.horario || 'Sem horário'}</p>
            <p>⏳ ${statusTempo}</p>
        </div>
        <a href="../html/edit_tasks.html?id=${tarefa.id}" class="edit-task-btn" title="Editar tarefa">
        ✏️
        </a>
    `;

    return card;
}

function controlarConclusao(checkbox, id) {
    const card = document.getElementById(`task-${id}`);

    if (!card) return;

    if (checkbox.checked) {
        card.style.opacity = "0.5";
        card.style.textDecoration = "line-through";

        timersDeRemocao[id] = setTimeout(() => {
            removerDefinitivamente(id);
        }, 700);
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
    bancoDeDadosLocal = bancoDeDadosLocal.filter(tarefa => String(tarefa.id) !== String(id));

    localStorage.setItem('tarefasApp', JSON.stringify(bancoDeDadosLocal));

    const card = document.getElementById(`task-${id}`);

    if (card) {
        card.style.transform = "scale(0.8)";
        card.style.opacity = "0";

        setTimeout(() => {
            processarTarefas("");
        }, 400);
    }
}

function renderizarResumoDia(tarefas) {
    const hojeList = document.getElementById('hojeList');
    const amanhaList = document.getElementById('amanhaList');

    if (!hojeList || !amanhaList) return;

    hojeList.innerHTML = "";
    amanhaList.innerHTML = "";

    const hoje = new Date();

    const amanha = new Date();
    amanha.setDate(hoje.getDate() + 1);

    const hojeStr = formatarDataParaComparacao(hoje);
    const amanhaStr = formatarDataParaComparacao(amanha);

    tarefas.forEach(tarefa => {
        if (tarefa.prazo === hojeStr) {
            hojeList.appendChild(criarItemResumo(tarefa));
        } else if (tarefa.prazo === amanhaStr) {
            amanhaList.appendChild(criarItemResumo(tarefa));
        }
    });
}

function criarItemResumo(tarefa) {
    const item = document.createElement('div');
    item.className = 'mini-item';

    item.innerHTML = `
        <span>${tarefa.titulo}</span>
        <span>${tarefa.horario || '--:--'}</span>
    `;

    return item;
}

function formatarDataParaComparacao(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
}

function configurarTrocaDeContainer() {
    const taskContainer = document.querySelector('.task-container');
    const infoContainer = document.querySelector('.info-container');
    const switchButton = document.getElementById('switchContainerBtn');

    if (!taskContainer || !infoContainer || !switchButton) return;

    switchButton.addEventListener('click', () => {
        taskContainer.classList.toggle('hidden');
        infoContainer.classList.toggle('hidden');

        if (infoContainer.classList.contains('hidden')) {
            switchButton.textContent = 'Ver resumo';
        } else {
            switchButton.textContent = 'Ver prioridades';
        }
    });
}

function configurarFiltros() {
    const campoPesquisa = document.getElementById('searchTaskInput');
    const campoData = document.getElementById('dateTaskInput');

    if (campoPesquisa) {
        campoPesquisa.addEventListener('input', aplicarFiltros);
    }

    if (campoData) {
        campoData.addEventListener('change', aplicarFiltros);
    }
}

function aplicarFiltros() {
    const campoPesquisa = document.getElementById('searchTaskInput');
    const campoData = document.getElementById('dateTaskInput');

    const filtroTitulo = campoPesquisa ? campoPesquisa.value.trim().toLowerCase() : "";
    const filtroData = campoData ? campoData.value : "";

    processarTarefas(filtroTitulo, filtroData);
}

function renderizarResultadoPesquisa(tarefas) {
    const altaUrge = document.getElementById('altaUrge');
    const mediaUrge = document.getElementById('mediaUrge');
    const baixaUrge = document.getElementById('baixaUrge');

    if (!altaUrge || !mediaUrge || !baixaUrge) return;

    esconderSecoesPrioridade();

    altaUrge.innerHTML = "";
    mediaUrge.innerHTML = "";
    baixaUrge.innerHTML = "";

    if (tarefas.length === 0) {
        altaUrge.innerHTML = `
            <p class="empty-search-message">Nenhuma tarefa encontrada.</p>
        `;
        return;
    }

    tarefas.forEach(tarefa => {
        const card = criarCardTarefa(tarefa);
        altaUrge.appendChild(card);
    });
}

function esconderSecoesPrioridade() {
    const titulos = document.querySelectorAll('.urgency-section .h2');

    titulos.forEach(titulo => {
        titulo.classList.add('hidden-priority-title');
    });

    const mediaSection = document.querySelector('#mediaUrge')?.closest('.urgency-section');
    const baixaSection = document.querySelector('#baixaUrge')?.closest('.urgency-section');

    if (mediaSection) mediaSection.classList.add('hidden-priority-section');
    if (baixaSection) baixaSection.classList.add('hidden-priority-section');
}

function mostrarSecoesPrioridade() {
    const titulos = document.querySelectorAll('.urgency-section .h2');

    titulos.forEach(titulo => {
        titulo.classList.remove('hidden-priority-title');
    });

    const mediaSection = document.querySelector('#mediaUrge')?.closest('.urgency-section');
    const baixaSection = document.querySelector('#baixaUrge')?.closest('.urgency-section');

    if (mediaSection) mediaSection.classList.remove('hidden-priority-section');
    if (baixaSection) baixaSection.classList.remove('hidden-priority-section');
}

function renderizarMesAtual() {
    const monthDisplay = document.getElementById('monthDisplay');

    if (!monthDisplay) return;

    const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];

    const agora = new Date();
    const mesAtual = agora.getMonth();

    monthDisplay.textContent = meses[mesAtual];
}