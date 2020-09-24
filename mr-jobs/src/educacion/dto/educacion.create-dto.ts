import {
    IsAlphanumeric,
    IsNotEmpty, MaxLength
} from "class-validator";

export class EducacionCreateDto{

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(100)
    nombreUniversidad: string;
}