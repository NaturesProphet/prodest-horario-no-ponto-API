import { Controller, Get, Param, Res } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { Veiculo } from './interfaces/veiculo.interface';

@Controller( 'horario' )
export class HorarioController {
  constructor( private readonly Service: HorarioService ) { }

  @Get( '/listar/:rotulo/:long/:lat' )
  async ListarHorarios ( @Param() p, @Res() res ) {
    try {
      let horarios = await this.Service.getHorarios( p.rotulo, [ p.long, p.lat ] );
      res.status( 200 ).send( horarios );
    } catch ( e ) {
      res.status( 400 ).send( `Erro na requisição. ${e.message}` );
    }
  }
}

