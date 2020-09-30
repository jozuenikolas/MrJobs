import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
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

    obtenerEmpleosConEmpresa(primerCriterio:string, segundoCriterio:string){
        let consulta : FindManyOptions<EmpleoEntity> = {}

        // console.log("SERVICIO INICIO")

        if(primerCriterio == undefined && segundoCriterio == undefined){
            // console.log("PRMER CRITERIO Y SEGUNDO CIRTERIO VACIOS")
            consulta  = {
                relations: [
                    "empresa"
                ],
                where:[
                    {
                        estadoEmpleo: "e"
                    }
                ],
                order:{
                    fechaPublicacion: "DESC",
                    nombreEmpleo: "ASC"
                }
            }
        } else if(primerCriterio == undefined){
            // console.log("PRMER CRITERIO VACIO Y SEGUNDO CIRTERIO LLENO")
            consulta  = {
                relations: [
                    "empresa"
                ],
                where:[
                    {
                        estadoEmpleo: "e",
                        ubicacionEmpleo: Like(`%${segundoCriterio}%`)
                    }
                ],
                order:{
                    fechaPublicacion: "DESC",
                    nombreEmpleo: "ASC"
                }
            }
        } else if(segundoCriterio == undefined){
            // console.log("PRMER CRITERIO LLENO Y SEGUNDO CIRTERIO VACIO")
            consulta  = {
                relations: [
                    "empresa"
                ],
                where:[
                    {
                        estadoEmpleo: "e",
                        // nombreEmpleo: primerCriterio,
                    }
                ],
                order:{
                    fechaPublicacion: "DESC",
                    nombreEmpleo: "ASC"
                }
            }
        } else{
            // console.log("PRMER CRITERIO Y SEGUNDO CIRTERIO LLENOS")
            consulta  = {
                relations: [
                    "empresa"
                ],
                where:[
                    {
                        estadoEmpleo: "e",
                        ubicacionEmpleo: Like(`%${segundoCriterio}%`),
                        // nombreEmpleo: primerCriterio,
                    }
                ],
                order:{
                    fechaPublicacion: "DESC",
                    nombreEmpleo: "ASC"
                }
            }
        }

        // console.log("SERVICIO INICIO")


        return this.repositorio.find(consulta)
    }

    obtenerEmpleoEmpresaPorIdEmpleo(idEmpleo:string){
        const consulta : FindManyOptions<EmpleoEntity> = {
            relations: [
                "empresa"
            ],
            where:[
                {
                    id: idEmpleo,
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

    obtenerEmpleoAplicacionesPorIdEmple(idEmpleo:string){
        const consulta : FindManyOptions<EmpleoEntity> = {
            relations: [
                "aplicaciones"
            ],
            where:[
                {
                    id: idEmpleo,
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

    obtenerSoloEmpleoPorIdEmpleo(idEmpleo:string){
        const consulta : FindManyOptions<EmpleoEntity> = {
            where:[
                {
                    id: idEmpleo,
                }
            ]
        }
        return this.repositorio.find(consulta)
    }

}