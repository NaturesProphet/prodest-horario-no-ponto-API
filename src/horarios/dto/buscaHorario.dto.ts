import { ApiModelProperty } from '@nestjs/swagger';
import { LocalDto } from './local.dto';

export class BuscaHorariosDto {

    @ApiModelProperty()
    rotulo: string;

    @ApiModelProperty()
    coordenadas: LocalDto[];
}
