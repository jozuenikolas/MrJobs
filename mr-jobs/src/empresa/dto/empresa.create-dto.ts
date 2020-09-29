import {
    IsAlphanumeric,
    IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength
} from "class-validator";

export class  EmpresaCreateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombreEmpresa: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    sectorEmpresa: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    numEmpleados:number;

}