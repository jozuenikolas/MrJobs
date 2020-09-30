import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {EmpresaService} from "./empresa.service";
import {UsuarioService} from "../usuario/usuario.service";
import {EmpresaCreateDto} from "./dto/empresa.create-dto";
import {validate, ValidationError} from "class-validator";
import {EmpresaEntity} from "./empresa.entity";

@Controller("empresa")
export class EmpresaController {

    constructor(
        private readonly _empresaService: EmpresaService,
        private readonly _usuarioService: UsuarioService,
    ) {
    }

    //http://localhost:3000/empresa/registrar
    @Get("registrar")
    registrar(
        @Res() res,
        @Session() session,
        @Query() parametrosConsulta,
    ){
        const estaLogueado = session.currentUser;
        if(estaLogueado) {
            const controlador = "empresa-registrar";
            const titulo = "Registrar empresa"
            res.render(
                'empresa/registrar',
                {
                    titulo: titulo,
                    controlador: controlador,
                    currentUser: session.currentUser,
                    mensajeError: parametrosConsulta.mensajeError,
                    registroExitoso: parametrosConsulta.registroExitoso,
                });
        }else{
            return res.redirect("/home/login")
        }
    }

    @Post("registrar")
    async registrarPost(
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session,
    ){
        const empresaValidar = new EmpresaCreateDto();
        empresaValidar.nombreEmpresa = parametrosCuerpo.nombreEmpresa;
        empresaValidar.sectorEmpresa = parametrosCuerpo.sectorEmpresa;
        empresaValidar.numEmpleados = Number(parametrosCuerpo.numEmpleados)

        const errores:ValidationError[] = await validate(empresaValidar)

        if (errores.length > 0) {
            //console.log('validation failed. errors: ', errores);
            const mensajeError = "No se pudo guardar la información de la empresa, ingrese la información correcta";
            return res.redirect(`/empresa/registrar?mensajeError=${mensajeError}`)
        } else{
            //console.log('validation succeed');
            const username = session.currentUser
            const usuario = await  this._usuarioService.obtenerIdPorusername(username)
            const empresaGuardar = new EmpresaEntity();
            empresaGuardar.nombreEmpresa = empresaValidar.nombreEmpresa
            empresaGuardar.sectorEmpresa = empresaValidar.sectorEmpresa
            empresaGuardar.numEmpleados = empresaValidar.numEmpleados
            empresaGuardar.usuario = usuario[0]
            try {
                const registroExitoso = "success"
                await this._empresaService.crearUno(empresaGuardar);
                return res.redirect(`/empresa/registrar?registroExitoso=${registroExitoso}`)
            } catch (e) {
                const mensajeError = "Error al crear empresa, por favor, inténtelo otra vez.";
                return res.redirect(`/empresa/registrar?mensajeError=${mensajeError}`)
            }
        }
    }

}