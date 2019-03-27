import { ApiModelProperty } from '@nestjs/swagger';

export class BuscaHorariosDto {

    @ApiModelProperty()
    rotulo: string;

    @ApiModelProperty()
    pontos: number[];
}
