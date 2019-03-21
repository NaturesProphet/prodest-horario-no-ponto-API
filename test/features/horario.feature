#language: pt
Funcionalidade: consultar o horário em que o ônibus passou pelo ponto geográfico
Endpoint que busca o horario em que um ônibus passou mais perto de um ponto geográfico


Cenário: 1: O usuário consulta o horario em que um ônibus passou mais perto de um ponto geográfico
Dado Quero saber que horas um onibus X passou por uma coordenada y
E enviei um ponto geográfico válido
E enviei um rotulo válido
Quando eu enviar a requisição
Então recebo o horário em que o ônibus X passou mais próximo da coordenada Y