#language: pt
Funcionalidade: consultar os horários em que o ônibus passou pelo ponto nas ultimas 24 horas


Cenário: 1: O usuário consulta os horarios em que um ônibus passou mais perto de um ponto
Dado Quero saber quais horários um onibus X passou por cada ponto de uma lista de pontos que darei
E enviei um rotulo e um array de IDs de ponto válidos
Quando eu enviar a requisição
Então recebo a lista de horários em que o ônibus X passou mais próximo em cada ponto


Cenário: 2: O usuário TENTA consultar os horarios em que um ônibus passou mais perto de um ponto
Dado Quero saber quais horários um onibus X passou por cada ponto de uma lista de pontos que darei
E nao enviei um rotulo ou um array de IDs ou ambos
Quando eu enviar a requisição
Então recebo uma msg de erro com o código 400 na resposta


Cenário: 3: O usuário TENTA consultar os horarios em que um ônibus passou mais perto de um ponto
Dado Quero saber quais horários um onibus X passou por cada ponto de uma lista de pontos que darei
E enviei um id de ponto inexistente dentro da lista de pontos
Quando eu enviar a requisição
Então recebo uma msg de erro com o código 400 na resposta