import {
    IsAlphanumeric,
    IsDate, IsNotEmpty, MaxLength,
} from "class-validator";

export class DetalleEducacionCreateDto  {

    @IsDate()
    @IsNotEmpty()
    anioInicio:string;

    @IsDate()
    @IsNotEmpty()
    anioFin:string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @MaxLength(100)
    titulacion: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @MaxLength(100)
    disciplina: string;
}