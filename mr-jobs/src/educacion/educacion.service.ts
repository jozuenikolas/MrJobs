import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EducacionEntity} from "./educacion.entity";
import {Repository} from "typeorm";

@Injectable()
export class EducacionService{
    constructor(
        @InjectRepository(EducacionEntity)
        private repositorio: Repository<EducacionEntity>
    ) {
    }
    crearUno(nuevaEducacion: EducacionEntity){
        return this.repositorio.save(nuevaEducacion) //promesa
    }
}