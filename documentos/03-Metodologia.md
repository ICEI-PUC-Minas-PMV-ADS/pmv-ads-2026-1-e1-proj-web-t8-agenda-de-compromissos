
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

> **Links Úteis**:
> - [11 Passos Essenciais para Implantar Scrum no seu 
> Projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)

### Processo

Para o acompanhamento das tarefas, a equipe utiliza o GitHub Projects, configurado com um quadro Kanban que reflete o ciclo de vida de cada funcionalidade do sistema de agenda:

- Backlog: Recebe todas as necessidades do sistema (ex: "Criar autenticação", "Exportar agenda para PDF").

- To Do: Lista de tarefas selecionadas para a Sprint atual da agenda.

- In Progress: Funcionalidades que estão sendo codificadas no momento.

- Ready to Test: Requisitos da agenda já codificados e aguardando validação em ambiente de teste.

- Testing: Etapa onde se verifica se o agendamento de compromissos está funcionando sem conflitos de horário.

- Done: Tarefas concluídas e integradas à versão principal do sistema.

[Adicione uma imagem do Kanban do projeto]

> **Links Úteis**:
> - [Planejamento de projetos para desenvolvedores](https://github.com/features/project-management/)
> - [Sobre Projects](https://docs.github.com/pt/github/managing-your-work-on-github/about-project-boards)
> - [Ferramentas de gerenciamento do Projects no GitHub](https://www.youtube.com/watch?v=RXEy6CFu9Hk)


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
| Repositório de código fonte         | GitHub                             | http://....                            |
| Documentos do projeto               | GitHub                             | http://....                            |
| Projeto de Interface                | Figma                              | http://....                            |
| Gerenciamento do Projeto            | GitHub Projects                    | http://....                            |
| Hospedagem                          | GitHub Pages                       | http://....                            |


### Estratégia de Organização de Codificação 

Todos os artefatos relacionados a implementação e visualização dos conteúdos do projeto do site são inseridos na pasta [codigo-fonte](https://github.com/ICEI-PUC-Minas-PMV-ADS/WebApplicationProject-Template-v2/tree/main/codigo-fonte). [Consulte a nossa sugestão referente a estratégia de organização de codificação a ser adotada pela equipe de desenvolvimento do projeto.]
