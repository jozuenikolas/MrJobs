import {
    IsAlpha,
    IsAlphanumeric, IsISO8601,
    IsNotEmpty, IsNumber, IsPositive, IsString, Max, MaxLength
} from "class-validator";
export class EmpleoCreateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombreEmpleo: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    descripcionEmpleo: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    ubicacionEmpleo: string;

    @IsNotEmpty()
    @IsString()
    @Max(100)
    tipoEmpleo: string;

    @IsNotEmpty()
    @IsString()
    @Max(100)
    funcionLaboral: string;

    @IsNotEmpty()
    @IsString()
    @Max(100)
    nivelAntiguedad: string;

    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(1)
    estadoEmpleo: string;

    @IsISO8601()
    @IsNotEmpty()
    fechaPublicacion: String;

}