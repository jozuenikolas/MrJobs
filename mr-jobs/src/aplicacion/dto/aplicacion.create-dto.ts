import {
    IsAlpha,
    IsAlphanumeric,
    IsNotEmpty,
    IsNumber, IsPositive, MaxLength

} from "class-validator";

export class AplicacionCreateDto{

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    aspiracionSalarial:number;

    @IsAlphanumeric()
    @IsNotEmpty()
    @MaxLength(100)
    resumen: string;

    @IsAlpha()
    @IsNotEmpty()
    @MaxLength(2)
    estado: string;
}