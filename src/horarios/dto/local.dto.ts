import { ApiModelProperty } from '@nestjs/swagger';

export class LocalDto {

    @ApiModelProperty()
    longitude: number;

    @ApiModelProperty()
    latitude: number;
}
