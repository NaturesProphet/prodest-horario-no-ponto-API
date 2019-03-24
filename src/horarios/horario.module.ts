import { Module } from '@nestjs/common';
import { HorarioController } from './horario.controller';
import { HorarioService } from './horario.service';
import { VeiculoProviders } from './veiculo.providers';
import { DatabaseModule } from '../database/database.module'

@Module( {
  imports: [ DatabaseModule ],
  controllers: [ HorarioController ],
  providers: [ HorarioService, ...VeiculoProviders ],
} )
export class HorarioModule { }
