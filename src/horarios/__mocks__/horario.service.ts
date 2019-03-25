import { Injectable } from '@nestjs/common';
import { Veiculo } from '../interfaces/veiculo.interface';
import { LocalDto } from '../dto/local.dto';
import { HorarioInterface } from '../interfaces/horarios.interface';
const group = require( 'array-groups' );

@Injectable()
export class HorarioService {
  /**
   * Método que retorna a lista de horarios em que um veículo esteve próximo a um ponto
   * @param rotulo numero do veículo
   * @param local coordenadas geográficas do local, no formato [LONG,LAT]
   */
  async getHorarios ( rotulo: string, local: LocalDto[] ): Promise<HorarioInterface[]> {

    let listaHorarios: HorarioInterface[] = new Array();

    for ( let i: number = 0; i < local.length; i++ ) {

      let veiculos = new Array();
      let queryLocation = [ local[ i ].longitude, local[ i ].latitude ];
      if ( rotulo != "" ) {
        veiculos =
          [
            { "LOCALIZACAO": [ -40.322700000000005, -20.350196666666665 ], "DATAHORA": 1553469168000 },
            { "LOCALIZACAO": [ -40.32252666666667, -20.349898333333332 ], "DATAHORA": 1553476038000 },
            { "LOCALIZACAO": [ -40.32252666666667, -20.349898333333332 ], "DATAHORA": 1553476038000 },
            { "LOCALIZACAO": [ -40.32296, -20.350413333333336 ], "DATAHORA": 1553469138000 }
          ],
          [
            { "LOCALIZACAO": [ -40.322700000000005, -20.350196666666665 ], "DATAHORA": 1553469168000 },
            { "LOCALIZACAO": [ -40.32296, -20.350413333333336 ], "DATAHORA": 1553469138000 }
          ];
      } else {
        throw new Error( "Bad request" );
      }

      let horario: HorarioInterface = {
        coordenadaPesquisada: queryLocation,
        rotulo: rotulo,
        Horarios: []
      }


      let horariosOrganizados = new Array();
      for ( let y = 0; y < veiculos.length; y++ ) {
        horariosOrganizados.push( veiculos[ y ].DATAHORA );
      }

      let grouped: Array<Veiculo> = group.GroupArray( veiculos, horariosOrganizados, 90000 );
      // 90000 = 1 min e meio -> agrupa os horarios que um veiculo foi visto num ponto neste intervalo
      for ( let z = 0; z < grouped.length; z++ ) {
        horario.Horarios.push( grouped[ z ][ 0 ].DATAHORA ); //funciona, mas da pra melhorar com geolib.
      }

      listaHorarios.push( horario );
    }
    return listaHorarios;
  }

}
