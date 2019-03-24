import { ApiModelProperty } from '@nestjs/swagger';

export class HorarioDto {

    @ApiModelProperty()
    distância: number;

    @ApiModelProperty()
    horario: string;

}
