import {
    IsAlpha,
    IsAlphanumeric, IsEmail,
    IsNotEmpty, MaxLength, MinLength
} from "class-validator";

export class UsuarioCreateDto{

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    correo: string;


    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(8)
    password: string;


    @IsAlpha()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsAlpha()
    @IsNotEmpty()
    @MaxLength(100)
    apellido: string;

    @IsAlpha()
    @IsNotEmpty()
    @MaxLength(100)
    pais: string;

    @IsAlpha()
    @IsNotEmpty()
    @MaxLength(100)
    ciudad: string;

}