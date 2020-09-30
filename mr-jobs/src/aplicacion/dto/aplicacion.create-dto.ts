import {
    IsAlpha,
    IsAlphanumeric,
    IsNotEmpty,
    IsNumber, IsPositive, IsString, MaxLength

} from "class-validator";

export class AplicacionCreateDto{

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    aspiracionSalarial:number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    resumen: string;

}