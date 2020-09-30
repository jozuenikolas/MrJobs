import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DetalleTrabajoEntity} from "./detalleTrabajo.entity";
import {FindManyOptions, Repository} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

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

    obtenerTrabajoPorDetalleTrabajoID(detalleTrabajoID: number){
        const consulta : FindManyOptions<DetalleTrabajoEntity> = {
            relations: [
                "trabajo"
            ],
            where: [
                {
                    id: detalleTrabajoID
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

}