import { Injectable } from '@nestjs/common';
import { Veiculo } from '../interfaces/veiculo.interface';
const agrupador = require( 'array-groups' );
import * as request from 'request-promise';
import { HorarioInterface } from '../interfaces/horarios.interface';
import { findNearest, Distance } from 'geolib';

@Injectable()
export class HorarioService {

  // dicionario estilo hash, com a localizacao dos pontos
  private readonly CoordenadasDosPontos;

  /**
   * Este método faz a carga do dicionário de pontos dentro do construtor da classe
   */
  private async CarregaPontos () {
    console.log( 'CARREGADOR DE PONTOS MOCKADO INVOCADO.' );

  }

  constructor() {
    this.CoordenadasDosPontos = new Object();
    this.CarregaPontos();
  }



  /**
   * Método que retorna a lista de horarios em que um veículo esteve próximo a um ponto
   * @param rotulo numero do veículo
   * @param pontos array de numeros ID dos pontos. ( IDs da Geocontrol )
   */
  public async getListaDeHorarios ( rotulo: string, pontos: number[] ) {

    let horarios: HorarioInterface[] = new Array();

    // laço 1. Recebe e agrupa os registros por faixa de horario em cada ponto
    for ( let i = 0; i < pontos.length; i++ ) {

      // 1. recebe os horarios em que o veiculo esteve próximo ao ponto
      let veiculosDesagrupados: Veiculo[] = await this.ExecuteQuery( rotulo, pontos[ i ] );

      // 2. agrupa os registros em grupos separados por um intervalo de 10 minutos
      let veiculosAgrupadosPorHorario: Veiculo[][] =
        this.agrupaPorFaixaDeHorario( veiculosDesagrupados );


      // 3. SUB-laço. seleciona os horarios por proximidade e popula o cabeçalho da resposta
      let horario: HorarioInterface = {
        pontoID: pontos[ i ],
        rotulo: rotulo,
        Horarios: new Array()
      }
      for ( let y = 0; y < veiculosAgrupadosPorHorario.length; y++ ) {

        //3.1. pra cada faixa de horario, seleciona o registro mais próximo do ponto
        let faixaDeHorario: Veiculo[] = veiculosAgrupadosPorHorario[ y ];
        //let ponto = this.CoordenadasDosPontos[ pontos[ i ] ];
        let ponto = [ -40.32262, -20.350101 ];
        let distance: Distance = this.SelecionaCoordenadaMaisProxima( ponto, faixaDeHorario );
        let veiculoMaisPerto = faixaDeHorario[ distance.key ];


        //3.2. pra cada um dos registros mais próximos, adiciona seu horario na lista
        horario.Horarios.push( veiculoMaisPerto.DATAHORA );

      }
      // fim de iteração. adiciona a lista gerada no array de horarios que será entregue ao usuario
      horarios.push( horario );
    }

    //fim do método, retorna a lista de horarios
    return horarios;

  }







  /**
   * Método que executa a query near para selecionar os registros de veículos adequados
   * @param rotulo identificação do ônibus
   * @param ponto ID do ponto de ônibus no banco da Geocontrol
   * @returns Veiculo[] 
   * MOCKADO
   */
  private async ExecuteQuery ( rotulo: string, ponto: number ): Promise<Veiculo[]> {
    let query: any[];
    if ( ponto == 687 ) {
      query = [ {
        LOCALIZACAO: [ -40.323775, -20.316538333333334 ],
        DATAHORA: 1553472082000
      },
      {
        LOCALIZACAO: [ -40.323775, -20.316538333333334 ],
        DATAHORA: 1553472082000
      } ];
    } else if ( ponto == 689 ) {
      query = [ {
        LOCALIZACAO: [ -40.323775, -20.316538333333334 ],
        DATAHORA: 1553472082000
      },
      {
        LOCALIZACAO: [ -40.323775, -20.316538333333334 ],
        DATAHORA: 1553472082000
      } ];
    } else {
      throw new Error( `Ponto ${ponto} não encontrado` );
    }
    return query;
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
    let a = findNearest( centro, CoordenadasLatLongEquivalentes );

    let g: Distance = JSON.parse( JSON.stringify( a ) );
    let objetoDistanciaInfo = findNearest( centro, CoordenadasLatLongEquivalentes );
    let distanceInfo: Distance = JSON.parse( JSON.stringify( objetoDistanciaInfo ) );
    return distanceInfo;
  }










  /**
   * Este método agrupa um array de Veiculo em sub-arrays agrupados por faixa de horario 
   * @param veiculosDesagrupados Array bruto de Veiculo 
   * @returns lista de arrays (Matriz), cada índice é uma faixa de horario.
   */
  private agrupaPorFaixaDeHorario ( veiculosDesagrupados: Veiculo[] ): Veiculo[][] {
    // referência: https://www.npmjs.com/package/array-groups

    let horariosArray: number[] = new Array();

    for ( let veiculo = 0; veiculo < veiculosDesagrupados.length; veiculo++ ) {
      horariosArray.push( veiculosDesagrupados[ veiculo ].DATAHORA );
    }

    // 600000 milisegundos, ou 10 minutos. agrupa por esse intervalo
    return agrupador.GroupArray( veiculosDesagrupados, horariosArray, 600000 );
  }








}
