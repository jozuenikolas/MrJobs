import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Query,
    Req,
    Res,
    Session
} from "@nestjs/common";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {TrabajoCreateDto} from "../trabajo/dto/trabajo.create-dto";
import {UsuarioService} from "./usuario.service";
import {DetalleTrabajoCreateDto} from "../detalleTrabajo/dto/detalleTrabajo.create-dto";
import {UsuarioEntity} from "./usuario.entity";
import {TrabajoService} from "../trabajo/trabajo.service";
import {TrabajoEntity} from "../trabajo/trabajo.entity";
import {DetalleTrabajoService} from "../detalleTrabajo/detalleTrabajo.service";
import {DetalleTrabajoEntity} from "../detalleTrabajo/detalleTrabajo.entity";
import {type} from "os";

//http://localhost:3000/home
@Controller("home")
export class UsuarioController{
    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _trabajoService: TrabajoService,
        private readonly _detalleTrabajoService: DetalleTrabajoService,
    ) {
    }

    //http://localhost:3000/usuario/prueba
    @Get("prueba")
    prueba(){
        return "Retorno de Prueba"
    }

    //http://localhost:3000/home
    @Get("")
    async inicio(
        @Res() res,
        //@Query() parametrosConsulta
    ){
        const controlador = "home";
        const titulo = "Mr Jobs"
        res.render(
            'usuario/inicio',
            {
                titulo: titulo,
                controlador: controlador
            });
    }

    //http://localhost:3000/home/login
    @Get("login")
    async login(
        @Res() res,
        //@Query() parametrosConsulta
    ){
        const controlador = "login";
        const titulo = "Iniciar sesión";
        res.render(
            'usuario/login',
            {
                titulo: titulo,
                controlador: controlador
            });
    }

    //http://localhost:3000/home/signup
    @Get("signup")
    async signup(
        @Res() res,
        //@Query() parametrosConsulta
    ){
        const controlador = "signup";
        const titulo = "Registrarse";
        res.render(
            'usuario/signup',
            {
                titulo: titulo,
                controlador: controlador
            });
    }

    //http://localhost:3000/home/signup
    @Post("signup")
    async crearUsuarioPaso1(
        @Res() res,
        @Body() parametrosCuerpo,
    ){
        const usuarioNuevo = new UsuarioCreateDto()
        usuarioNuevo.username = parametrosCuerpo.username;
        usuarioNuevo.correo = parametrosCuerpo.correo;
        usuarioNuevo.password = parametrosCuerpo.password;
        usuarioNuevo.passwordConfirmar = parametrosCuerpo.passwordConfirmar;
        usuarioNuevo.nombre = parametrosCuerpo.nombre;
        usuarioNuevo.apellido = parametrosCuerpo.apellido;
        usuarioNuevo.pais = parametrosCuerpo.pais;
        usuarioNuevo.ciudad = parametrosCuerpo.ciudad;

        const errores: ValidationError[] = await validate(usuarioNuevo)
        if(usuarioNuevo.password != usuarioNuevo.passwordConfirmar){
            //console.log("diferentes")
            const mensajeError = 'Las contraseñas no son iguales'
            const controlador = "signup";
            const titulo = "Registrarse";
            return res.render('usuario/signup',{
                titulo: titulo,
                controlador: controlador,
                error: mensajeError,
            })
        }else{
            //console.log("iguales")
            if (errores.length > 0) {
                console.error('Errores: ', errores);

                const mensajeError = 'No se pudo crear el usuario, ingrese la información correcta'
                const controlador = "signup";
                const titulo = "Registrarse";

                return res.render('usuario/signup',{
                    titulo: titulo,
                    controlador: controlador,
                    error: mensajeError,
                })
            } else {
                //console.log("exito")
                const controlador = "signup";
                const titulo = "Registrarse";
                return res.render('usuario/signupParte2',{
                    titulo: titulo,
                    controlador: controlador,
                    usuario: usuarioNuevo,
                })
            }
        }
    }
    @Post("crearDesdeVista")
    async crearUsuario(
        @Res() res,
        @Body() parametrosCuerpo,
        @Session() session,
    ) {
        const trabajoNuevo = new TrabajoCreateDto()
        trabajoNuevo.nombreTrabajo = parametrosCuerpo.cargo;
        trabajoNuevo.organizacion = parametrosCuerpo.empresa;
        trabajoNuevo.tipo = parametrosCuerpo.tipoEmpleo;
        trabajoNuevo.ubicacion = parametrosCuerpo.ubicacion;

        const usuarioNuevo = new UsuarioCreateDto()
        usuarioNuevo.username = parametrosCuerpo.username;
        usuarioNuevo.correo = parametrosCuerpo.correo;
        usuarioNuevo.password = parametrosCuerpo.password;
        usuarioNuevo.nombre = parametrosCuerpo.nombre;
        usuarioNuevo.apellido = parametrosCuerpo.apellido;
        usuarioNuevo.pais = parametrosCuerpo.pais;
        usuarioNuevo.ciudad = parametrosCuerpo.ciudad;

        const detalleTrabajo = new DetalleTrabajoCreateDto();
        detalleTrabajo.anioFin = parametrosCuerpo.fechaFin;
        detalleTrabajo.anioInicio = parametrosCuerpo.fechaFin;


        const errores: ValidationError[] = await validate(trabajoNuevo)
        if (errores.length > 0) {
            console.log(errores)
            const mensajeError = 'No se pudo guardar la información de empleo, ingrese la información correcta'
            const controlador = "signup2";
            const titulo = "Registrarse";

            return res.render('usuario/signupParte2',{
                titulo: titulo,
                controlador: controlador,
                error: mensajeError,
                usuario: usuarioNuevo,
            })
        }else{
            console.log("exito");
            console.log(trabajoNuevo)

            console.log(usuarioNuevo)
            console.log(detalleTrabajo)
            let usuarioGrabar = new UsuarioEntity()
            usuarioGrabar= userDTOtoEntity(usuarioNuevo,usuarioGrabar)

            let respuestaCreacionUsuario;
            try {
                respuestaCreacionUsuario = await this._usuarioService.crearUno(usuarioGrabar);
                console.log("usuairo creado")
            } catch (e) {
                console.log(e)
                throw  new InternalServerErrorException("Error creando el usuario")
            }
            if (respuestaCreacionUsuario) {
                let trabajoGrabar = new  TrabajoEntity()
                trabajoGrabar = trabajoDTOtoEntity(trabajoNuevo,trabajoGrabar)
                let respuestaCreacionTrabajo;
                try {
                    respuestaCreacionTrabajo = await this._trabajoService.crearUno(trabajoGrabar)
                    console.log("trabajo creado")
                } catch (e) {
                    console.log(e)
                    throw  new InternalServerErrorException("Error creando el empleo")
                }
                if (respuestaCreacionTrabajo) {
                    let detalleTrabajoGrabar = new DetalleTrabajoEntity()
                    detalleTrabajoGrabar.trabajo=respuestaCreacionTrabajo.id;
                    detalleTrabajoGrabar.usuario= respuestaCreacionUsuario.id;
                    detalleTrabajoGrabar.anioInicio = detalleTrabajo.anioInicio;
                    detalleTrabajoGrabar.anioFin = detalleTrabajo.anioFin;

                    let respuestaCreacionDetalleTrabajo;
                    try {
                        respuestaCreacionDetalleTrabajo = await this._detalleTrabajoService.crearUno(detalleTrabajoGrabar)
                    } catch (e) {
                        console.error(e);
                        throw  new InternalServerErrorException({
                            mensaje: 'Error creando Empleo(fechas)'
                        })
                    }
                    if(respuestaCreacionDetalleTrabajo){
                        session.currentUser = usuarioNuevo.username;
                        console.log(session)
                        return res.redirect(`/home/profile/${usuarioNuevo.username}`)
                    }else{
                        throw  new InternalServerErrorException({
                            mensaje: 'Error creando el empleo y usuario'
                        })
                    }
                }
            }
        }

    }


    //http://localhost:3000/profile/:username
    @Get("/profile/:username")
    async profile(
        @Res() res,
        @Param() parametrosRuta,
        @Session() session,
    ){
        const estaLogueado = session.currentUser;
        if(estaLogueado){
            const controlador = "profile";
            const titulo = "Profile"
            let usuario;
            try {
                usuario = await this._usuarioService.obtenerUsuarioPorUsername(parametrosRuta.username);
                let consultaUsuarioDetalleTrabajo;
                consultaUsuarioDetalleTrabajo = await this._usuarioService.obtenerDetalleTrabajoPorUserName(parametrosRuta.username);
                let detalleTrabajo= new DetalleTrabajoEntity();
                detalleTrabajo= consultaUsuarioDetalleTrabajo[0].detallesTrabajo;
                console.log(detalleTrabajo);
                console.log(detalleTrabajo[0].id);

                let consultaTrabajo = await this._detalleTrabajoService.obtenerTrabajoPorDetalleTrabajoID(detalleTrabajo[0].id);

                if(consultaTrabajo){
                    let trabajoInformacion = consultaTrabajo[0]
                    console.log(trabajoInformacion)
                    res.render(
                        'usuario/profile',
                        {
                            titulo: titulo,
                            controlador: controlador,
                            currentUser: session.currentUser,
                            currentProfile: parametrosRuta.username,
                            usuario: usuario,
                            trabajo: trabajoInformacion
                        });
                }else{
                    let idEducacion;
                    try {

                        if(idEducacion){
                            console.log(idEducacion)
                            //consultar eduacacion
                            res.render(
                                'usuario/profile',
                                {
                                    titulo: titulo,
                                    controlador: controlador,
                                    currentUser: session.currentUser,
                                    currentProfile: parametrosRuta.username,
                                    usuario: usuario
                                });
                        }else{

                        }
                    }catch (e) {

                    }
                }
            }catch (e) {
                console.log(e)
                throw new  InternalServerErrorException("error cargando el perfil")
            }

        }else {
            return res.redirect("/home/login")
        }
    }

    @Post('login')
    async loginVerificacion(
        @Res() res,
        @Body() parametrosCuerpo,
        @Session() session,
    ){
        let passwordRecibida = parametrosCuerpo.password;
        try {
            let passwordBase = await this._usuarioService.obtenerPasswordPorUsername(parametrosCuerpo.username);
            if(passwordBase){
                if(passwordRecibida == passwordBase.password){
                    session.currentUser = parametrosCuerpo.username;
                    return res.redirect(`/home/profile/${parametrosCuerpo.username}`)
                }else{
                    console.log(session)
                    const controlador = "login";
                    const titulo = "Iniciar sesión";
                    const mensajeError = 'Nombre de usuario o contraseña incorrectos'
                    res.render(
                        'usuario/login',
                        {
                            titulo,
                            controlador,
                            error: mensajeError,
                        });
                }
            }else{
                console.log(session)
                const controlador = "login";
                const titulo = "Iniciar sesión";
                const mensajeError = 'Nombre de usuario o contraseña incorrectos'
                res.render(
                    'usuario/login',
                    {
                        titulo,
                        controlador,
                        error: mensajeError,
                    });
            }

        }catch (e) {
            console.log(e);
            const controlador = "login";
            const titulo = "Iniciar sesión";
            const mensajeError = 'Nombre de usuario o contraseña incorrectos'
            res.render(
                'usuario/login',
                {
                    titulo,
                    controlador,
                    error: mensajeError,
                });
            return ;
        }



    }

    @Get('logout')
    logout(
        @Session() session,
        @Res() res,
        @Req() req
    ){
        session.currentUser = undefined;
        session.destroy();
        return res.redirect('/home')

    }

}

function userDTOtoEntity(usuarioDTO, usuarioEntity) {
    usuarioEntity.username= usuarioDTO.username;
    usuarioEntity.correo= usuarioDTO.correo;
    usuarioEntity.password= usuarioDTO.password;
    usuarioEntity.nombre= usuarioDTO.nombre;
    usuarioEntity.apellido= usuarioDTO.apellido;
    usuarioEntity.pais= usuarioDTO.pais;
    usuarioEntity.ciudad= usuarioDTO.ciudad;
    return usuarioEntity;
}

function trabajoDTOtoEntity(trabajoDTO, trabajoEntity) {
    trabajoEntity.nombre = trabajoDTO.nombreTrabajo;
    trabajoEntity.tipo = trabajoDTO.tipo;
    trabajoEntity.ubicacion = trabajoDTO.ubicacion;
    trabajoEntity.organizacion = trabajoDTO.organizacion;
    return trabajoEntity;
}