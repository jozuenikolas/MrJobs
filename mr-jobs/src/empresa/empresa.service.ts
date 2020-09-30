import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {EmpresaEntity} from "./empresa.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

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

}