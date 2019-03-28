import { ApiModelProperty } from '@nestjs/swagger';

export class BuscaHorariosDto {

    @ApiModelProperty()
    rotulo: string;

    @ApiModelProperty( { type: Array( Number ) } )
    pontos: number[];
}
