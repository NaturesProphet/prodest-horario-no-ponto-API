import { Module } from '@nestjs/common';
import { HorarioController } from '../horario.controller';
import { HorarioService } from './horario.service';

@Module( {
  imports: [],
  controllers: [ HorarioController ],
  providers: [ HorarioService ],
} )
export class HorarioModule { }
