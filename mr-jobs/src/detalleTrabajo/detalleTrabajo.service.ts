import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DetalleTrabajoEntity} from "./detalleTrabajo.entity";
import {Repository} from "typeorm";

@Injectable()
export class DetalleTrabajoService{
    constructor(
        @InjectRepository(DetalleTrabajoEntity)
        private repositorio: Repository<DetalleTrabajoEntity>
    ) {
    }
    crearUno(nuevoDetalleTrabajo: DetalleTrabajoEntity){
        return this.repositorio.save(nuevoDetalleTrabajo) //promesa
    }
}