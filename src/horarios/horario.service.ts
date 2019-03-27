import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Veiculo } from './interfaces/veiculo.interface';
import { pontosUri } from '../common/config';
const agrupador = require( 'array-groups' );
import * as request from 'request-promise';
import { HorarioInterface } from './interfaces/horarios.interface';
import { findNearest, Distance } from 'geolib';

@Injectable()
export class HorarioService {

  private readonly CoordenadasDosPontos;

  private async CarregaPontos (): Promise<Object> {
    console.log( 'Carregando a lista de pontos' );
    let dicionario = new Object;
    try {
      const options = {
        uri: pontosUri,
        headers: {
          'User-Agent': 'Request-Promise',
        },
        json: true
      }
      let listaBruta = await request.get( options );

      listaBruta.forEach( ponto => {
        let local = [ ponto.longitude, ponto.latitude ];
        dicionario[ ponto.id ] = local;
      } );
      console.log( `Lista de pontos carregada. Pontos disponíveis: ${listaBruta.length}` );
    } catch ( erro ) {
      console.log( `Erro ao tentar recuperar a lista de pontos. ${erro.message}` );
      console.log( 'O programa sairá' );
      process.exit( 1 );
    }
    return dicionario;
  }

  constructor( @Inject( 'VEICULO_MODEL' ) private readonly Model: Model<Veiculo> ) {
    this.CoordenadasDosPontos = this.CarregaPontos();
  }








  /**
   * Método que retorna a lista de horarios em que um veículo esteve próximo a um ponto
   * @param rotulo numero do veículo
   * @param pontos array de numeros ID dos pontos. ( IDs da Geocontrol )
   */
  async getListaDeHorarios ( rotulo: string, pontos: number[] ) {
    let horarios: HorarioInterface[] = new Array();

    // usar após agrupar
    // for ( let i = 0; i < pontos.length; i++ ) {
    //   let registros = await this.ExecuteQuery( rotulo, pontos[ i ] );
    //   let pontoGeograficoCentral = this.CoordenadasDosPontos[ pontos[ i ] ];
    //   let local: Distance = this.SelecionaCoordenadaMaisProxima( pontoGeograficoCentral, registros );
    //   let indice: number = Number( local.key );
    //   let distancia = local.distance;

    //   let veiculo: Veiculo = {
    //     DATAHORA: registros[ indice ].DATAHORA,
    //     DISTANCIA: distancia,
    //     LOCALIZACAO: registros[ indice ].LOCALIZACAO,
    //     ROTULO: rotulo
    //   }
    // }



  }







  /**
   * Método que executa a query near para selecionar os registros de veículos adequados
   * @param rotulo identificação do ônibus
   * @param ponto ID do ponto de ônibus no banco da Geocontrol
   * @returns Veiculo[] 
   */
  private async ExecuteQuery ( rotulo: string, ponto: number ): Promise<Veiculo[]> {
    // DESMOCKAR APÓS OS TESTES
    // DESMOCKAR APÓS OS TESTES
    // DESMOCKAR APÓS OS TESTES
    rotulo = '11069';
    let arrayDeCoordenadasLongLat = [ -40.32262, -20.350101 ];
    //let arrayDeCoordenadasLongLat = this.CoordenadasDosPontos[ ponto ];
    // DESMOCKAR APÓS OS TESTES
    // DESMOCKAR APÓS OS TESTES
    // DESMOCKAR APÓS OS TESTES

    return await this.Model.find(
      {
        ROTULO: rotulo,
        LOCALIZACAO:
        {
          $near:
          {
            $geometry: { type: "Point", coordinates: arrayDeCoordenadasLongLat },
            $minDistance: 0,
            $maxDistance: 50
          }
        }
      },
      {
        DATAHORA: 1,
        _id: 0,
        LOCALIZACAO: 1
      }
    ).exec();
  }








  /**
   * 
   * @param posicaoCentral Array [LONG,LAT] com as coordenadas do local central
   * @param Lista Array bruto que vem da query ao mongodb
   * @returns Objeto apontando o índice da lista onde está a posição mais próxima e a distãncia
   */
  private SelecionaCoordenadaMaisProxima ( posicaoCentral: number[], lista: Veiculo[] ): Distance {

    /**
     * O modulo GeoLib trabalha com objetos no formato
     *  {
     *    latitude: float,
     *    longitude: float
     *  }
     * antes de usar, é necessário converter os dados para este formato.
     * referência: https://www.npmjs.com/package/geolib
     */


    /**
     * 
     * O argumento 'lista' é um objeto bruto que chega da query near executada no mongodb.
     * seu formato é parecido com este:
     * [
     *  {
     *    "LOCALIZACAO": 
     *      [
     *        -40.322700000000005,
     *        -20.350196666666665
     *      ],
     *    "DATAHORA": 1553469168000
     *  }, .... 
     * ]
     * 
    */

    const centro = {
      latitude: posicaoCentral[ 1 ],
      longitude: posicaoCentral[ 0 ]
    };

    let CoordenadasLatLongEquivalentes = [];

    for ( let indiceLista = 0; indiceLista < lista.length; indiceLista++ ) {
      let latlng = {
        latitude: lista[ indiceLista ].LOCALIZACAO[ 1 ],
        longitude: lista[ indiceLista ].LOCALIZACAO[ 0 ]
      };
      CoordenadasLatLongEquivalentes.push( latlng );
    }

    let Indice: Distance = findNearest( centro, CoordenadasLatLongEquivalentes )[ 0 ];
    return Indice;
  }


}