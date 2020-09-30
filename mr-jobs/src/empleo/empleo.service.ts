import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {EmpleoEntity} from "./empleo.entity";

@Injectable()
export class EmpleoService {

    constructor(
        @InjectRepository(EmpleoEntity)
        private repositorio: Repository<EmpleoEntity>
    ) {
    }
    crearUno(nuevoEmpleo: EmpleoEntity){
        return this.repositorio.save(nuevoEmpleo)
    }



}