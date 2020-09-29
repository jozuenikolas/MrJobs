import {
    IsAlphanumeric,
    IsNotEmpty, IsString, MaxLength
} from "class-validator";

export class TrabajoCreateDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombreTrabajo: string;

    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    @MaxLength(100)
    tipo: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    ubicacion: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    organizacion: string;
}