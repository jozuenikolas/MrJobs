import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {AplicacionService} from "./aplicacion.service";
import {EmpleoService} from "../empleo/empleo.service";
import {AplicacionCreateDto} from "./dto/aplicacion.create-dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioService} from "../usuario/usuario.service";
import {AplicacionEntity} from "./aplicacion.entity";


//http://localhost:3000/aplicacion
@Controller("aplicacion")
export class AplicacionController {

    constructor(
        private readonly _aplicacionService: AplicacionService,
        private readonly _empleoService: EmpleoService,
        private readonly _usuarioService: UsuarioService
    ) {
    }


    //http://localhost:3000/aplicacion/aplicar/:idEmpleo
    @Get("aplicar/:idEmpleo")
    async aplicar(
        @Res() res,
        @Session() session,
        @Param() parametrosRuta
    ) {
        const estaLogueado = session.currentUser;
        if (estaLogueado) {
            const controlador = "aplicacion-aplicar";
            const titulo = "Aplicar empleo"
            const idEmpleo = parametrosRuta.idEmpleo


            const respuetaEmpleoEmpresaPorIdEmpleo = await this._empleoService.obtenerEmpleoEmpresaPorIdEmpleo(idEmpleo)
            const nombreEmpresa = respuetaEmpleoEmpresaPorIdEmpleo[0]["empresa"]["nombreEmpresa"]
            const respuestaEmpleosConEmpresa = await this._empleoService.obtenerEmpleosConEmpresa(undefined, undefined)
            let empleos = []
            respuestaEmpleosConEmpresa.forEach((objeto) =>{
                let empleo = {}
                empleo["id"] = objeto.id
                empleo["nombreEmpleo"] = objeto.nombreEmpleo
                empleo["nombreEmpresa"] = objeto.empresa["nombreEmpresa"]
                empleo["ubicacionEmpleo"] = objeto.ubicacionEmpleo
                empleo["fechaPublicacion"] = objeto.fechaPublicacion
                if(empleo["nombreEmpresa"] == nombreEmpresa && empleo["id"] != idEmpleo){
                    empleos.push(empleo)
                }
            })
            const respuestaEmpleoAplicaciones = await this._empleoService.obtenerEmpleoAplicacionesPorIdEmple(idEmpleo)
            let empleo = {}
            empleo["nombreEmpleo"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["nombreEmpleo"]
            empleo["nombreEmpresa"] = nombreEmpresa
            empleo["ubicacionEmpleo"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["ubicacionEmpleo"]
            empleo["fechaPublicacion"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["fechaPublicacion"]
            empleo["numAplicaciones"] = respuestaEmpleoAplicaciones[0]["aplicaciones"].length
            empleo["nivelAntiguedad"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["nivelAntiguedad"]
            empleo["numEmpleados"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["empresa"]["numEmpleados"]
            empleo["sectorEmpresa"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["empresa"]["sectorEmpresa"]
            empleo["descripcionEmpleo"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["descripcionEmpleo"]
            empleo["tipoEmpleo"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["tipoEmpleo"]
            empleo["funcionLaboral"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["funcionLaboral"]
            //console.log(empleo)
            res.render(
                'aplicacion/aplicar',
                {
                    titulo: titulo,
                    controlador: controlador,
                    currentUser: session.currentUser,
                    idEmpleo: idEmpleo,
                    nombreEmpresa: nombreEmpresa,
                    empleos: empleos,
                    empleo: empleo
                });
        } else {
            return res.redirect("/home/login")

        }
    }

    //http://localhost:3000/aplicacion/solicitud/:idEmpleo
    @Get("solicitud/:idEmpleo")
    async solicitud(
        @Res() res,
        @Session() session,
        @Param() parametrosRuta,
        @Query() parametrosConsulta,
    ) {
        const estaLogueado = session.currentUser;
        if (estaLogueado) {
            const controlador = "aplicacion-solicitud";
            const titulo = "Solicitud empleo"
            const idEmpleo = parametrosRuta.idEmpleo

            const respuetaEmpleoEmpresaPorIdEmpleo = await this._empleoService.obtenerEmpleoEmpresaPorIdEmpleo(idEmpleo)

            let empleo = {}
            empleo["nombreEmpleo"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["nombreEmpleo"]
            empleo["nombreEmpresa"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["empresa"]["nombreEmpresa"]
            empleo["ubicacionEmpleo"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["ubicacionEmpleo"]
            empleo["nivelAntiguedad"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["nivelAntiguedad"]
            empleo["descripcionEmpleo"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["descripcionEmpleo"]
            empleo["tipoEmpleo"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["tipoEmpleo"]
            empleo["funcionLaboral"] = respuetaEmpleoEmpresaPorIdEmpleo[0]["funcionLaboral"]
            //console.log(empleo)

            res.render(
                'aplicacion/solicitud',
                {
                    titulo: titulo,
                    controlador: controlador,
                    currentUser: session.currentUser,
                    idEmpleo: idEmpleo,
                    empleo: empleo,
                    mensajeError: parametrosConsulta.mensajeError,
                    publicacionExitosa: parametrosConsulta.publicacionExitosa,
                });
        } else {
            return res.redirect("/home/login")
        }
    }

    @Post("solicitud/:idEmpleo")
    async solicitudPost(
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session,
        @Param() parametrosRuta,
    ){
        const idEmpleo = parametrosRuta.idEmpleo
        const username = session.currentUser
        const aplicacionValidar = new AplicacionCreateDto();
        aplicacionValidar.aspiracionSalarial = Number(parametrosCuerpo.aspiracionSalarial)
        aplicacionValidar.razon = parametrosCuerpo.razon
        const errores:ValidationError[] = await validate(aplicacionValidar)

        if (errores.length > 0) {
            console.log(errores)
            const mensajeError = "No se pudo solicitar el empleo, ingrese la información correcta";
            return res.redirect(`/aplicacion/solicitud/${parametrosRuta.idEmpleo}?mensajeError=${mensajeError}`)
        }else{
            const empleo = await this._empleoService.obtenerSoloEmpleoPorIdEmpleo(idEmpleo)
            const usuario = await this._usuarioService.obtenerSoloUsuarioPorUsername(username)

            const aplicacionGuardar = new AplicacionEntity()
            aplicacionGuardar.aspiracionSalarial = aplicacionValidar.aspiracionSalarial
            aplicacionGuardar.razon = aplicacionValidar.razon
            aplicacionGuardar.usuario = usuario[0]
            aplicacionGuardar.empleo = empleo[0]

            try{
                const publicacionExitosa = "success"
                await this._aplicacionService.crearUno(aplicacionGuardar)
                return res.redirect(`/aplicacion/solicitud/${parametrosRuta.idEmpleo}?publicacionExitosa=${publicacionExitosa}`)
            }catch (e) {
                const mensajeError = "Error al crear aplicacion, por favor, inténtelo otra vez.";
                return res.redirect(`/aplicacion/solicitud/${parametrosRuta.idEmpleo}?mensajeError=${mensajeError}`)
            }
        }
    }

}