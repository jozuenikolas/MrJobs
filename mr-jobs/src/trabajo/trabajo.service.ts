import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TrabajoEntity} from "./trabajo.entity";
import {FindManyOptions, Repository} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

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
    obtenerTrabajoPorID(trabajoID:number){
        const consulta : FindManyOptions<TrabajoEntity> = {
            select:[
                "id",
                "nombre",
                "tipo",
                "ubicacion",
                "organizacion"
            ],
            where: [
                {
                    id: trabajoID
                }
            ]
        }
        return this.repositorio.findOneOrFail(consulta)
    }
}