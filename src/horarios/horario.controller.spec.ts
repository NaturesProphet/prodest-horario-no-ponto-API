import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../app.module";
import { BuscaHorariosDto } from "./dto/buscaHorario.dto";

jest.mock( "./horario.service" );
jest.mock( "./horario.module" );


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



    test( '1: O usuário consulta os horarios em que um ônibus passou mais perto de um ponto', ( { given, and, when, then } ) => {
        let body: BuscaHorariosDto;
        let response;
        given( 'Quero saber quais horários um onibus X passou por cada ponto de uma lista de pontos que darei', () => {

        } );

        and( 'enviei um rotulo e um array de IDs de ponto válidos', () => {
            body = {
                pontos: [ 687, 689 ],
                rotulo: '11069'
            }
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).post( '/horario' ).send( body );
        } );

        then( 'recebo a lista de horários em que o ônibus X passou mais próximo em cada ponto', () => {
            expect( response.body ).toEqual(
                [
                    {
                        "Horarios": [ 1553472082000 ],
                        "pontoID": 687, "rotulo": "11069"
                    },
                    {
                        "Horarios": [ 1553472082000 ],
                        "pontoID": 689, "rotulo": "11069"
                    }
                ] );
        } );
    } );


    test( '2: O usuário TENTA consultar os horarios em que um ônibus passou mais perto de um ponto', ( { given, and, when, then } ) => {
        let body: BuscaHorariosDto;
        let response;
        given( 'Quero saber quais horários um onibus X passou por cada ponto de uma lista de pontos que darei', () => {

        } );

        and( "nao enviei um rotulo ou um array de IDs ou ambos", () => {
            body = undefined;
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).post( '/horario' ).send( body );
        } );

        then( /^recebo uma msg de erro com o código (.*) na resposta$/, ( arg0 ) => {
            expect( response.status ).toBe( 400 );
        } );
    } );


    test( '3: O usuário TENTA consultar os horarios em que um ônibus passou mais perto de um ponto', ( { given, and, when, then } ) => {
        let body: BuscaHorariosDto;
        let response;
        given( 'Quero saber quais horários um onibus X passou por cada ponto de uma lista de pontos que darei', () => {

        } );

        and( 'enviei um id de ponto inexistente dentro da lista de pontos', () => {
            body = {
                pontos: [ 687, 0 ],
                rotulo: '11069'
            }
        } );

        when( 'eu enviar a requisição', async () => {
            response = await request( app.getHttpServer() ).post( '/horario' ).send( body );
        } );

        then( /^recebo uma msg de erro com o código (.*) na resposta$/, ( arg0 ) => {
            expect( response.status ).toBe( 400 );
        } );
    } );


    afterAll( async () => {
        await app.close();
    } );

} );
