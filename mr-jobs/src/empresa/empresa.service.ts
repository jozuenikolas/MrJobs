import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";
import {EmpresaEntity} from "./empresa.entity";



@Injectable()
export class EmpresaService{

    constructor(
        @InjectRepository(EmpresaEntity)
        private repositorio: Repository<EmpresaEntity>
    ) {
    }

    crearUno(nuevaEmpresa: EmpresaEntity){
        return this.repositorio.save(nuevaEmpresa)
    }

    obtenerIdPorNombreEmpresa(nombreEmpresa:string){
        const consulta : FindManyOptions<EmpresaEntity> = {
            select:[
                "id"
            ],
            where: [
                {
                    nombreEmpresa: nombreEmpresa
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

}