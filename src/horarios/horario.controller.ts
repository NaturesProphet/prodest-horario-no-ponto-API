import { Controller, Res, Post, Body } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { BuscaHorariosDto } from './dto/buscaHorario.dto';
import { LocalDto } from './dto/local.dto';
import { HorarioInterface } from './interfaces/horarios.interface';


@Controller( 'horario' )
export class HorarioController {
  constructor( private readonly Service: HorarioService ) { }


  @Post()
  async BulkList ( @Body() query: BuscaHorariosDto, @Res() res ) {
    let rotulo: string = query.rotulo;
    let coordenadas: LocalDto[] = query.coordenadas;
    try {
      let horarios: HorarioInterface[] = await this.Service.getHorarios( rotulo, coordenadas );
      res.status( 200 ).send( horarios );
    } catch ( error ) {
      res.status( 400 ).send( error.message );
    }
  }
}

