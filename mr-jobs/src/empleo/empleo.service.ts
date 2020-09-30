import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";
import {EmpleoEntity} from "./empleo.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

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

    obtenerEmpleosConEmpresa(){
        const consulta : FindManyOptions<EmpleoEntity> = {
            relations: [
                "empresa"
            ],
            where:[
                {
                    estadoEmpleo: "e"
                }
            ],
            order:{
                fechaPublicacion: "DESC"
            }
        }
        return this.repositorio.find(consulta)
    }

}