import {
    IsAlphanumeric,
    IsNotEmpty, IsNumber, IsPositive, MaxLength
} from "class-validator";

export class  EmpresaCreateDto {

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    nombreEmpresa: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    sectorEmpresa: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    numEmpleados:number;

}