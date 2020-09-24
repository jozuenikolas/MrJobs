import {
    IsDate, IsNotEmpty
} from "class-validator";

export class DetalleTrabajoCreateDto{

    @IsNotEmpty()
    @IsDate()
    anioInicio:string;

    @IsNotEmpty()
    @IsDate()
    anioFin:string;

}