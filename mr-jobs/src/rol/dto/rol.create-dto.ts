import {
    IsAlphanumeric,
    IsNotEmpty, MaxLength
} from "class-validator";

export class RolCreateDto{

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    nombreRol: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    codigo: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(500)
    descripcion: string;
}