import { Controller, Res, Body, HttpStatus, Post } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { BuscaHorariosDto } from './dto/buscaHorario.dto';
import { HorarioInterface } from './interfaces/horarios.interface';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiUseTags( 'Horários' )
@Controller( 'horario' )
export class HorarioController {
  constructor( private readonly Service: HorarioService ) { }


  @Post()
  @ApiOperation( { title: 'Busca horários onde o veículo em cada ponto' } )
  @ApiResponse( {
    status: 200,
    description: 'Query executada sem erros',
  } )
  @ApiResponse( {
    status: 400,
    description: 'Os dados enviados não são válidos',
  } )
  async ConsultaHorariosPorPonto ( @Body() query: BuscaHorariosDto, @Res() res ) {
    if ( query.rotulo && query.pontos ) {
      try {
        let horarios: HorarioInterface[] = await this.Service
          .getListaDeHorarios( query.rotulo, query.pontos );
        res.status( HttpStatus.OK ).send( horarios );
      } catch ( reqError ) {
        if ( reqError.message.match( /^Ponto (.*) não encontrado$/ ) ) { // expressão regular! yayy!
          res.status( HttpStatus.BAD_REQUEST ).send( reqError.message );
        } else {
          res.status( HttpStatus.BAD_GATEWAY ).send( reqError.message );
        }
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
