import {Body, Controller, Get, Post, Query, Res, Session} from "@nestjs/common";
import {EmpresaService} from "../empresa/empresa.service";
import {EmpleoService} from "./empleo.service";
import {EmpleoEntity} from "./empleo.entity";
import {EmpleoCreateDto} from "./dto/empleo.create-dto";
import {validate, ValidationError} from "class-validator";

//http://localhost:3000/empleo
@Controller("empleo")
export class EmpleoController{

    constructor(
        private readonly _empresaService: EmpresaService,
        private readonly _empleoService: EmpleoService,
    ) {
    }

    //http://localhost:3000/empleo/buscar
    @Get("buscar")
    buscar(
        @Res() res,
        @Session() session,
    ){
        const estaLogueado = session.currentUser;
        if(estaLogueado) {
            const controlador = "empleo-buscar";
            const titulo = "Buscar empleo"
            res.render(
                'empleo/buscar',
                {
                    titulo: titulo,
                    controlador: controlador,
                    currentUser: session.currentUser,
                });
        }else{
            return res.redirect("/home/login")
        }
    }

    //http://localhost:3000/empleo/publicar
    @Get("publicar")
    publicar(
        @Res() res,
        @Session() session,
        @Query() parametrosConsulta,
    ){
        const estaLogueado = session.currentUser;
        if(estaLogueado) {
            const controlador = "empleo-publicar";
            const titulo = "Publicar empleo"
            res.render(
                'empleo/publicar',
                {
                    titulo: titulo,
                    controlador: controlador,
                    currentUser: session.currentUser,
                    mensajeError: parametrosConsulta.mensajeError,
                    publicacionExitosa: parametrosConsulta.publicacionExitosa,
                });
        }else{
            return res.redirect("/home/login")
        }
    }

    @Post("publicar")
    async pubicarPost(
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session,
    ){
        parametrosCuerpo.estadoEmpleo = "e"
        let fechaActual = new Date();
        let diaActual = ("0" + fechaActual.getDate()).slice(-2);
        let mesActual = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
        let anioActual = fechaActual.getFullYear();
        parametrosCuerpo.fechaPublicacion = anioActual + "-" + mesActual + "-" + diaActual

        const empleoValidar = new EmpleoCreateDto();
        empleoValidar.nombreEmpleo = parametrosCuerpo.nombreEmpleo
        empleoValidar.descripcionEmpleo = parametrosCuerpo.descripcionEmpleo
        empleoValidar.ubicacionEmpleo = parametrosCuerpo.ubicacionEmpleo
        empleoValidar.tipoEmpleo = parametrosCuerpo.tipoEmpleo
        empleoValidar.funcionLaboral = parametrosCuerpo.funcionLaboral
        empleoValidar.nivelAntiguedad = parametrosCuerpo.nivelAntiguedad
        empleoValidar.estadoEmpleo = parametrosCuerpo.estadoEmpleo
        empleoValidar.fechaPublicacion =  parametrosCuerpo.fechaPublicacion

        const errores:ValidationError[] = await validate(empleoValidar)

        if (errores.length > 0) {
            console.log(errores)
            const mensajeError = "No se pudo publicar el empleo, ingrese la información correcta";
            return res.redirect(`/empleo/publicar?mensajeError=${mensajeError}`)
        }else{
            const nombreEmpresa = parametrosCuerpo.nombreEmpresa
            const empresa = await this._empresaService.obtenerIdPorNombreEmpresa(nombreEmpresa)
            const empleoGuardar = new EmpleoEntity()
            empleoGuardar.nombreEmpleo = empleoValidar.nombreEmpleo
            empleoGuardar.descripcionEmpleo = empleoValidar.descripcionEmpleo
            empleoGuardar.ubicacionEmpleo = empleoValidar.ubicacionEmpleo
            empleoGuardar.tipoEmpleo = empleoValidar.tipoEmpleo
            empleoGuardar.funcionLaboral = empleoValidar.funcionLaboral
            empleoGuardar.nivelAntiguedad = empleoValidar.nivelAntiguedad
            empleoGuardar.estadoEmpleo = empleoValidar.estadoEmpleo
            empleoGuardar.fechaPublicacion =  empleoValidar.fechaPublicacion
            empleoGuardar.empresa = empresa[0]

            try {
                const publicacionExitosa = "success"
                await this._empleoService.crearUno(empleoGuardar);
                return res.redirect(`/empleo/publicar?publicacionExitosa=${publicacionExitosa}`)
            } catch (e) {
                const mensajeError = "Error al crear empleo, por favor, inténtelo otra vez.";
                return res.redirect(`/empleo/publicar?mensajeError=${mensajeError}`)
            }
        }
    }

}