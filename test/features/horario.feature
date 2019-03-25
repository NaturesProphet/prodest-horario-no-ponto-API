#language: pt
Funcionalidade: consultar o horário em que o ônibus passou pelo ponto geográfico
Endpoint que busca o horario em que um ônibus passou mais perto de um ponto geográfico


Cenário: 1: O usuário consulta o horario em que um ônibus passou mais perto de um ponto geográfico
Dado Quero saber quais horios um onibus X passou por uma coordenada y
E enviei um rotulo e um array de pontos geográficos válido
Quando eu enviar a requisição
Então recebo a lista de horários em que o ônibus X passou mais próximo em cada coordenada

Cenário: 2: O usuário tenta consultar o horario em que um ônibus passou mais perto de um ponto geográfico
Dado Quero saber quais horios um onibus X passou por uma coordenada y
E enviei um rotulo e um array de pontos geográficos inválidos
Quando eu enviar a requisição
Então recebo uma mensagem de erro com codigo 400