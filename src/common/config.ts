const mongoHost: string = process.env.MONGO_HOST || 'localhost';
const mongoPort: number = Number( process.env.MONGO_PORT ) || 27017;
const mongoUser: string = process.env.MONGO_USER || 'root';
const mongoPassword: string = process.env.MONGO_PASSWORD || 'rootpass';
const mongoSchema: string = process.env.MONGO_SCHEMA || 'historico24hrs';
const mongoConf: string = '?authSource=admin';


export { mongoHost, mongoPort, mongoPassword, mongoUser, mongoSchema, mongoConf }