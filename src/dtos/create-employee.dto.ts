import { IsString , IsNotEmpty , IsInt} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEmployeeDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    empFullname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    empAddress: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    empTel: string;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    empSalary: number;
    
    @ApiProperty({ type: 'string', format: 'binary' })
    empPhoto: any;
}