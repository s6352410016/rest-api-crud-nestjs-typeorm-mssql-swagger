import { IsString , IsInt} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateEmployeeDto{
    @ApiProperty({required: false})
    @IsString()
    empFullname: string;

    @ApiProperty({required: false})
    @IsString()
    empAddress: string;

    @ApiProperty({required: false})
    @IsString()
    empTel: string;

    @ApiProperty({required: false})
    @Type(() => Number)
    @IsInt()
    empSalary: number;
    
    @ApiProperty({ type: 'string', format: 'binary' , required: false})
    empPhoto: any;
}