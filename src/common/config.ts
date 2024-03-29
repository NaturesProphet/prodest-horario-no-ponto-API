const mongoHost: string = process.env.MONGO_HOST || 'localhost';
const mongoPort: number = Number( process.env.MONGO_PORT ) || 27017;
const mongoUser: string = process.env.MONGO_USER || 'admin';
const mongoPassword: string = process.env.MONGO_PASSWORD || 'admin123';
const mongoSchema: string = process.env.MONGO_SCHEMA || 'historico';
const mongoConf: string = '?authSource=admin';
const DbConnectionToken: string = process.env.DB_CONNECTION_TOKEN || 'DbConnectionToken';
const pontosUri = process.env.PONTOS_URI || 'https://api.es.gov.br/ceturb/v2/pontos';
const env = process.env.NODE_ENV || 'development';
const raio: number = Number( process.env.QUERY_RAIO ) || 100;


export {
    mongoHost, mongoPort, mongoPassword,
    mongoUser, mongoSchema, mongoConf,
    DbConnectionToken, pontosUri, env, raio
}
