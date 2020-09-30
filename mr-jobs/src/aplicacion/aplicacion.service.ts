import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AplicacionEntity} from "./aplicacion.entity";

@Injectable()
export class AplicacionService {

    constructor(
        @InjectRepository(AplicacionEntity)
        private repositorio: Repository<AplicacionEntity>
    ) {
    }
    crearUno(nuevaAplicacion: AplicacionEntity){
        return this.repositorio.save(nuevaAplicacion)
    }



}