import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TrabajoEntity} from "./trabajo.entity";
import {Repository} from "typeorm";

@Injectable()
export class TrabajoService{
    constructor(
        @InjectRepository(TrabajoEntity)
        private repositorio: Repository<TrabajoEntity>
    ) {
    }
    crearUno(nuevoTrabajo: TrabajoEntity){
        return this.repositorio.save(nuevoTrabajo) //promesa
    }
}