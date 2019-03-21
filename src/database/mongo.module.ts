import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  mongoHost, mongoPassword, mongoPort,
  mongoUser, mongoSchema, mongoConf
} from '../common/config';



const uri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoSchema}${mongoConf}`;
const options = {
  useNewUrlParser: true
};


@Module( {
  imports: [ MongooseModule.forRoot( uri, options ) ],
  controllers: [],
  providers: [],
} )
export class MongoModule { }
