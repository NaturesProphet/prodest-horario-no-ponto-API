<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[![Pipeline Tests](https://gitlab.es.gov.br/espm/Transcol-Online/Realtime/horario-no-ponto-API/badges/master/build.svg)](https://gitlab.es.gov.br/espm/Transcol-Online/Realtime/horario-no-ponto-API/pipelines)[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)] (http://commitizen.github.io/cz-cli/)[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


## Description

API de consulta de horarios de ônibus nos pontos baseada em histórico das ultimas 24 horas do real-time.

## Installation

```bash
$ npm install
```

## Variáveis de ambiente
```bash
MONGO_HOST            # Servidor do MongoDB
MONGO_PORT            # Porta do mongoDB. Default: 27017
MONGO_USER            # Usuario do mongoDB
MONGO_PASSWORD        # Senha do mongoBD
MONGO_SCHEMA          # Nome do banco no mongo
QUERY_RAIO            # Raio da busca
```

## Exemplo de requisição
```
POST /horario
{
	
"rotulo": "11069",
"pontos": 
	[ 687, 689]
	
}

```

## Exemplo de resposta
```
[
    {
        "pontoID": 687,
        "rotulo": "11069",
        "Horarios": [
            1553472082000
        ]
    },
    {
        "pontoID": 689,
        "rotulo": "11069",
        "Horarios": [
            1553472082000
        ]
    }
]
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
