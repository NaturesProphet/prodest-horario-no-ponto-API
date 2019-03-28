import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { env } from './common/config';
const pacote = require( '../package.json' );
const fs = require( 'fs' );

async function bootstrap () {
  const app = await NestFactory.create( AppModule );
  app.enableCors();

  let options; // seleciona o schema http fora de prod e https em prod
  if ( env == 'production' ) {
    options = new DocumentBuilder()
      .setTitle( pacote.name )
      .setDescription( pacote.description )
      .setVersion( pacote.version )
      .addTag( 'API' )
      .setSchemes( 'https', 'http' )
      .build();
  } else {
    options = new DocumentBuilder()
      .setTitle( pacote.name )
      .setDescription( pacote.description )
      .setVersion( pacote.version )
      .addTag( 'API - Development env' )
      .setSchemes( 'http', 'https' )
      .build();
  }
  const document = SwaggerModule.createDocument( app, options );
  SwaggerModule.setup( 'docs', app, document );
  fs.writeFileSync( 'swagger.json', JSON.stringify( document ) )
  await app.listen( 3031 );
}
bootstrap();
