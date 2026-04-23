
# Metodologia

Esta seção descreve a organização da equipe para a execução das tarefas de desenvolvimento do Sistema de Agenda de Compromissos e as ferramentas utilizadas para a manutenção dos códigos e demais artefatos.


## Gerenciamento de Projeto
A metodologia ágil escolhida para o desenvolvimento deste projeto foi o SCRUM. Esta escolha justifica-se pela necessidade de entregas incrementais, visto que um sistema de agenda demanda funcionalidades críticas (como CRUD de eventos e notificações) que precisam de validação constante. Segundo Amaral, Fleury e Isoni (2019, p. 68), o Scrum proporciona uma visão clara dos resultados, disciplina na execução e um ambiente colaborativo focado na resolução de problemas técnicos.

### Divisão de Papéis

A equipe está estruturada da seguinte forma para garantir o fluxo de desenvolvimento da agenda:

- Scrum Master: Pablo Luiz Amaro de Miranda, responsável por garantir que o fluxo de trabalho não sofra impedimentos e que as cerimônias do Scrum sejam seguidas.

- Product Owner: José Júlio de Paiva Neto, responsável por priorizar o Backlog, definindo quais funcionalidades da agenda (ex: integração com mapas, lembretes via e-mail) são essenciais para cada entrega.

- Equipe de Desenvolvimento: William Rocha Dos Santos, responsáveis pela implementação técnica das funcionalidades de front-end e back-end do sistema.

- Equipe de Design: Lucas Felipe dos Santos Lamarca, focados na experiência do usuário (UX) e interface (UI), garantindo que a visualização do calendário seja intuitiva.
  
- Equipe de Design: Marco Tulio Willig Dias Coelho, focados na experiência do usuário (UX) e interface (UI), garantindo que a visualização do calendário seja intuitiva.


### Processo

Para o acompanhamento das tarefas, a equipe utiliza o GitHub Projects, configurado com um quadro Kanban que reflete o ciclo de vida de cada funcionalidade do sistema de agenda:

- Backlog: Recebe todas as necessidades do sistema (ex: "Criar autenticação", "Exportar agenda para PDF").

- To Do: Lista de tarefas selecionadas para a Sprint atual da agenda.

- In Progress: Funcionalidades que estão sendo codificadas no momento.

- Ready to Test: Requisitos da agenda já codificados e aguardando validação em ambiente de teste.

- Testing: Etapa onde se verifica se o agendamento de compromissos está funcionando sem conflitos de horário.

- Done: Tarefas concluídas e integradas à versão principal do sistema.

<img width="886" height="802" alt="image" src="https://github.com/user-attachments/assets/8ba56a23-bacd-40eb-ac85-d9eeecae0f3a" />


### Etiquetas
<p>As tarefas relacionadas à agenda são categorizadas para facilitar a identificação visual no repositório:</p>

<ul>
  <li>Bug (Erro no código)</li>
  <li>Desenvolvimento (Development)</li>
  <li>Documentação (Documentation)</li>
  <li>Gerência de Projetos (Project Management)</li>
  <li>Infraestrutura (Infrastructure)</li>
  <li>Testes (Tests)</li>
</ul>

<figure> 
  <img src="https://user-images.githubusercontent.com/100447878/164068979-9eed46e1-9b44-461e-ab88-c2388e6767a1.png"
    <figcaption>Figura 3 - Tela do esquema de cores e categorias</figcaption>
</figure> 
  
### Ferramentas

Os artefatos do Sistema de Agenda de Compromissos são desenvolvidos utilizando as plataformas listadas na tabela abaixo:

| AMBIENTE                            | PLATAFORMA                         | LINK DE ACESSO                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-ads-2026-1-e1-proj-web-t8-agenda-de-compromissos/tree/main                           |
| Documentos do projeto|GitHub| https://onedrive.live.com/:w:/g/personal/657ec8aff579eca8/IQD8Xws3EIWjSr0T0UouWJe7ARKQfi4KHlttApGeI1i28TU?rtime=11gD0qCF3kg&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3cvYy82NTdlYzhhZmY1NzllY2E4L0lRRDhYd3MzRUlXalNyMFQwVW91V0plN0FSS1FmaTRLSGx0dEFwR2VJMWkyOFRVP2U9QXZoS2tD|
| Projeto de Interface                | Figma                              | https://www.figma.com/proto/TF5qUOIfvbY5v8iXvdd7If/AGENDA-DE-COMPROMISSOS-DI%C3%81RIOS?node-id=38-889&p=f&t=mAiX91sKa6kre7nC-0&scaling=contain&content-scaling=fixed&page-id=5%3A5818&starting-point-node-id=38%3A889                         |
| Gerenciamento do Projeto            | GitHub Projects                    | http://....                            |
| Hospedagem                          | GitHub Pages                       | http://....                            |


### Estratégia de Organização de Codificação 

Todos os artefatos relacionados a implementação e visualização dos conteúdos do projeto do site são inseridos na pasta [codigo-fonte](https://github.com/ICEI-PUC-Minas-PMV-ADS/WebApplicationProject-Template-v2/tree/main/codigo-fonte).
