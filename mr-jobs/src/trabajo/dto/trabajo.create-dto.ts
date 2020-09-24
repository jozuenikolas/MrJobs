import {
    IsAlphanumeric,
    IsNotEmpty, MaxLength
} from "class-validator";

export class TrabajoCreateDto {

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    nombreTrabajo: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    tipo: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    ubicacion: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    organizacion: string;
}