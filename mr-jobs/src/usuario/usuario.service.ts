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
        return this.repositorio.findOneOrFail(consulta)
    }

    obtenerEmpresasPorUsername(username:string){
        const consulta : FindManyOptions<UsuarioEntity> = {
            relations: [
                "empresas"
            ],
            where: [
                {
                    username: username
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

    obtenerUsuarioPorUsername(username:string){
        const consulta : FindManyOptions<UsuarioEntity> = {
            select:[
                "id",
                "correo",
                "password",
                "nombre",
                "apellido",
                "pais",
                "ciudad",
            ],
            where: [
                {
                    username: username
                }
            ]
        }
        return this.repositorio.findOneOrFail(consulta)
    }

    obtenerDetalleTrabajoPorUserName(username: string){
        const consulta : FindManyOptions<UsuarioEntity> = {
            relations: [
                "detallesTrabajo"
            ],
            where: [
                {
                    username: username
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

    obtenerSoloUsuarioPorUsername(username:string){
        const consulta : FindManyOptions<UsuarioEntity> = {
            where: [
                {
                    username: username
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

    obtenerUsuarioEmpresasEmpleosAplicacionesPorUsername(username:string){
        const consulta : FindManyOptions<UsuarioEntity> = {
            relations: [ "empresas", "empresas.empleos", "empresas.empleos.aplicaciones"],
            where: [
                {
                    username: username
                }
            ]
        }
        return this.repositorio.find(consulta)
    }


}