import {
    IsAlphanumeric,
    IsNotEmpty, IsNumber, IsPositive, Max, MaxLength
} from "class-validator";

export class  EmpresaCreateDto {

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    nombre: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    tipoIndustria: string;

}