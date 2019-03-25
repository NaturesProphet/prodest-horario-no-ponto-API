import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../app.module";
import { LocalDto } from "./dto/local.dto";

jest.mock( "./horario.module" );
jest.mock( "./horario.service" );

const feature = loadFeature( "./test/features/horario.feature" );

defineFeature( feature, test => {
    let module: TestingModule;
    let app: INestApplication;

    beforeAll( async () => {
        module = await Test.createTestingModule( {
            imports: [ AppModule ]
        } ).compile();
        app = module.createNestApplication();
        await app.init();
    } );

    test( '1: O usuário consulta o horario em que um ônibus passou mais perto de um ponto geográfico', ( { given, and, when, then } ) => {
        let endpoint: string;
        let rotulo: string;
        let coordenadas: LocalDto[];
        let response: any;
        let body: any;


        given( 'Quero saber quais horios um onibus X passou por uma coordenada y', () => {
            endpoint = '/horario';
        } );

        and( 'enviei um rotulo e um array de pontos geográficos válido', () => {
            body = {
                rotulo: "11069",
                coordenadas:
                    [
                        {
                            longitude: -40.32262,
                            latitude: -20.350101
                        },
                        {
                            longitude: -40.3230,
                            latitude: -20.350101
                        }
                    ]
            }
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).post( endpoint ).send( body );
        } );

        then( 'recebo a lista de horários em que o ônibus X passou mais próximo em cada coordenada', () => {
            expect( response.status ).toBe( 200 );
            expect( response.body ).toEqual( [ { "Horarios": [ 1553469168000, 1553476038000 ], "coordenadaPesquisada": [ -40.32262, -20.350101 ], "rotulo": "11069" }, { "Horarios": [ 1553469168000, 1553476038000 ], "coordenadaPesquisada": [ -40.323, -20.350101 ], "rotulo": "11069" } ] );
        } );
    } );

    test( '2: O usuário tenta consultar o horario em que um ônibus passou mais perto de um ponto geográfico', ( { given, and, when, then } ) => {
        let endpoint: string;
        let rotulo: string;
        let coordenadas: LocalDto[];
        let response: any;
        let body: any;


        given( 'Quero saber quais horios um onibus X passou por uma coordenada y', () => {
            endpoint = '/horario';
        } );

        and( 'enviei um rotulo e um array de pontos geográficos inválidos', () => {
            body = {
                rotulo: "",
                coordenadas:
                    [
                        {
                            longitude: -40.32262,
                            latitude: -20.350101
                        },
                        {
                            longitude: -40.3230,
                            latitude: -20.350101
                        }
                    ]
            }
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).post( endpoint ).send( body );
        } );

        then( "recebo uma mensagem de erro com codigo 400", () => {
            expect( response.status ).toBe( 400 );
        } );
    } );

    afterAll( async () => {
        await app.close();
    } );

} );
