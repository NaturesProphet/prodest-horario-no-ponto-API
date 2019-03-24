import * as mongoose from 'mongoose';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import {
  mongoHost, mongoPassword, mongoPort,
  mongoUser, mongoSchema, mongoConf
} from '../common/config';

const uri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoSchema}${mongoConf}`;

const options: MongooseModuleOptions = {
  useNewUrlParser: true,
};

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect( uri, options ),
  },
];
