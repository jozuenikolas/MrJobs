import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {FindManyOptions, Repository} from "typeorm";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {
    }
    crearUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) //promesa
    }

    obtenerIdPorusername(username:string){
        const consulta : FindManyOptions<UsuarioEntity> = {
            select:[
                "id"
            ],
            where: [
                {
                    username: username
                }
            ]
        }
        return this.repositorio.find(consulta)
    }
    obtenerPasswordPorUsername(username:string){
        const consulta : FindManyOptions<UsuarioEntity> = {
            select:[
                "password"
            ],
            where: [
                {
                    username: username
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

}