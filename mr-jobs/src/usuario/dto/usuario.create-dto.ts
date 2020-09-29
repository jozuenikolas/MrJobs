import {
    IsAlpha,
    IsEmail,
    IsNotEmpty, MaxLength, MinLength
} from "class-validator";

export class UsuarioCreateDto{

    @IsAlpha()
    @IsNotEmpty()
    @MaxLength(100)
    nombreUsuario: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    correo: string;

    @IsNotEmpty()
    @MaxLength(12)
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @MaxLength(12)
    @MinLength(8)
    passwordConfirmar: string;


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