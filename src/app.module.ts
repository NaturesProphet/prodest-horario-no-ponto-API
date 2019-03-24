import { Module } from '@nestjs/common';
import { HorarioModule } from './horarios/horario.module';

@Module( {
  imports: [ HorarioModule ],
  controllers: [],
  providers: [],
} )
export class AppModule { }
