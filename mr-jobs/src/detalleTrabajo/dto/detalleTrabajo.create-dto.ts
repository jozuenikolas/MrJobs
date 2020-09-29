import {
    IsDate, IsISO8601, IsNotEmpty
} from "class-validator";

export class DetalleTrabajoCreateDto{

    @IsNotEmpty()
    @IsISO8601()
    anioInicio:string;

    @IsNotEmpty()
    @IsISO8601()
    anioFin:string;

}