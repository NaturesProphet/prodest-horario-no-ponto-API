import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Veiculo } from './interfaces/veiculo.interface';

@Injectable()
export class HorarioService {
  constructor( @Inject( 'VEICULO_MODEL' ) private readonly Model: Model<Veiculo> ) { }


  /**
   * Método que retorna a lista de horarios em que um veículo esteve próximo a um ponto
   * @param rotulo numero do veículo
   * @param local coordenadas geográficas do local, no formato [LONG,LAT]
   */
  async getHorarios ( rotulo: string, local: number[] ): Promise<Veiculo[]> {

    //lista os horarios em que o onibus esteve em um raio de 25 metros do ponto dado
    const veiculos: Veiculo[] = await this.Model.find(

      {
        ROTULO: rotulo,
        LOCALIZACAO:
        {
          $near:
          {
            $geometry: { type: "Point", coordinates: local },
            $minDistance: 0,
            $maxDistance: 25
          }
        }
      },
      {
        DATAHORA: 1, //filtra para pegar apenas o horario
        _id: 0
      }
    ).exec();
    //console.log( JSON.stringify( veiculos, null, 2 ) )
    return veiculos;
  }
}
