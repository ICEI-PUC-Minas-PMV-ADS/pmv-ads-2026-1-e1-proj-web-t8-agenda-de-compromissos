# Especificação do Projeto

## Perfis de Usuários


<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil Agendador</th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">
Pessoa que precisa organizar melhor a sua rotina e deixar de perder os horários. </td>

</tr>
<tr>
<td><b>Necessidades</b></td>
<td>
  
1. Identificar o tipo de lançamento;

2. Alterar, remarcar, confirmar ou excluir eventos, caso necessário;

3. Adicionar Alertas, Notificações e Formas de lembrete, com prazos 
a serem definidos;

4. Ordenar e pesquisar por prazos, adicionar marcação por data, 
horário, prioridade, e tipo de evento;

5. Adicionar subtarefas.</td>
</tr>
</tbody>
</table>


## Histórias de Usuários

|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
| Agendador          | Anotar as datas de prova | Não me esquecer e ficar sem estudar |
| Agendador          | Marcar um aviso de tempo restante para a entrega de trabalhos  | Não perder o prazo de entrega  |
| Agendador          | Anotar o horário dos remédios e quais são | Não deixar de tomá-los |
| Agendador          | Marcar minha consulta ao médico | Não as perder  |
| Agendador          | Anotar uma rotina de estudos | Tornar o dia mais produtivo |
| Agendador          | Organizar eventos dos filhos | Não me esquecer|
| Agendador          | Anotar tarefas e horários a serem cumpridos| Ter organização da entrega da equipe |
| Agendador          | Marcar, visualizar e alterar anotações, reuniões e eventos | Simplificar a rotina de trabalho |
| Agendador          | Visualizar a rotina e anotações da semana | Aproveitar o tempo livre |



## Requisitos do Projeto


### Requisitos Funcionais

|ID    | Descrição                | Prioridade |
|-------|---------------------------------|----|
| RF-01 |O sistema deve permitir que o usuário possa cadastrar uma nova conta ou entrar/sair dela (login/logout)| Alta | 
| RF-02 |O sistema deve permitir que o usuário crie uma tarefa com título, descrição, data/hora| Alta |
| RF-03 |O sistema deve permitir que o usuário gerencie suas tarefas| Alta |
| RF-04 |O sistema deve permitir a visualização da lista de tarefas cadastradas| Alta |
| RF-05 |O sistema deve permitir que o usuário pesquise o nome da tarefa pelo título ou data| Alta |
| RF-06 |O sistema deve permitir que o usuário tenha a possibilidade de definir lembretes informando a data de conclusão da tarefa| Alta |
| RF-07 |O sistema deve permitir que o usuário filtre as tarefas por data/prioridade| Alta |
| RF-08 |O sistema deve permitir que o usuário marque as tarefas como concluídas ou em execução| Alta |
| RF-09 |O sistema deve permitir que o usuário organize as tarefas por ordem de prioridade| Média |
| RF-10 |O sistema deve permitir que o usuário veja o intervalo de tempo para a conclusão da tarefa| Média |
| RF-11 |O sistema deve permitir que o usuário tenha a possibilidade de deixar a tarefa de forma recorrente| Baixa |
| RF-12 |O sistema deve enviar as tarefas excluídas para uma lixeira deixando a possibilidade de restauração| Baixa |


### Requisitos não Funcionais

|ID        | Descrição                                                                                                                             |Prioridade |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------|----|
|  RNF-01  |  A aplicação deve estar disponível em ambiente web acessível pela Internet.                                                               | Alta  | 
|  RNF-02  |  A aplicação deverá ser responsiva, permitindo o uso adequado em computadores, tablets e smartphones.                                     | Alta  |
|  RNF-03  |  O sistema deve possuir tempo de carregamento das páginas inferior a 3 segundos em condições normais de uso.                              | Baixa | 
|  RNF-04  |  O sistema deve ser compatível com os principais navegadores do mercado: Google Chrome, Mozilla Firefox e Microsoft Edge.                 | Alta  | 
|  RNF-05  |  A aplicação deve possuir interface simples e intuitiva para facilitar o agendamento e visualização de compromissos.                      | Média |
|  RNF-06  |  O sistema deve garantir a segurança dos dados dos usuários através de autenticação e controle de acesso.                                 | Alta  | 
|  RNF-07  |  O sistema deve permitir acesso apenas a usuários autenticados, garantindo a privacidade das informações dos compromissos cadastrados.    | Média | 
|  RNF-08  |  A aplicação deve permitir disponibilidade mínima de 99% do tempo de funcionamento.                                                       | Média | 
|  RNF-09  |  O sistema deve permitir fácil manutenção e atualização do código pelos desenvolvedores.                                                  | Alta  |
|  RNF-10  |  A aplicação deve garantir boa legibilidade da interface, com contraste adequado entre textos e elementos visuais.                        | Alta  | 


