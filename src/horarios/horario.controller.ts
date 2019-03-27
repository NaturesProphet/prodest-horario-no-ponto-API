import { Controller, Res, Post, Body, HttpStatus } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { BuscaHorariosDto } from './dto/buscaHorario.dto';
import { HorarioInterface } from './interfaces/horarios.interface';



@Controller( 'horario' )
export class HorarioController {
  constructor( private readonly Service: HorarioService ) { }


  @Post()
  async ConsultaHorariosPorPonto ( @Body() query: BuscaHorariosDto, @Res() res ) {
    if ( query.rotulo && query.pontos ) {
      try {
        let horarios: any[] = await this.Service
          .getListaDeHorarios( query.rotulo, query.pontos );
        res.status( HttpStatus.OK ).send( horarios );
      } catch ( e ) {
        res.status( HttpStatus.BAD_GATEWAY ).send( e.message );
      }
    }
    else {
      const body = {
        rotulo: "string numérica com o rotulo",
        pontos: [ 1, 2, 3, 4, 5 ]
      }
      const msg = `Requisição inválida. utilize o formato ${JSON.stringify( body )}`;
      res.status( HttpStatus.BAD_REQUEST ).send( msg );
    }
  }
}
