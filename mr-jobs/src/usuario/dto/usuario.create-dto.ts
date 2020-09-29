import {
    IsAlpha, IsAlphanumeric,
    IsEmail,
    IsNotEmpty, IsString, MaxLength, MinLength
} from "class-validator";

export class UsuarioCreateDto{

    @IsAlphanumeric()
    @IsNotEmpty()
    @MaxLength(100)
    username: string;

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

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    pais: string;

    @IsAlpha()
    @IsNotEmpty()
    @MaxLength(100)
    ciudad: string;

}