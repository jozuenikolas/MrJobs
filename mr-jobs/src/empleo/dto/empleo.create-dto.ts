import {
    IsAlpha,
    IsAlphanumeric,
    IsNotEmpty, IsNumber, IsPositive, Max, MaxLength
} from "class-validator";
export class EmpleoCreateDto {

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    nombreEmpleo: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    ubicacion: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    rangoInicial:number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    rangoFinal:number;

    @IsNotEmpty()
    @IsAlphanumeric()
    @Max(100)
    tipo: string;

    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(1)
    estado: string;

}