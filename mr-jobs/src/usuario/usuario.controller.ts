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

//http://localhost:3000/home
@Controller("home")
export class UsuarioController{
    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _trabajoService: TrabajoService,
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

        try {
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
                session.currentUser = usuarioNuevo.username;
                console.log(session)
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

                        return res.redirect(`/home/profile/${usuarioNuevo.username}`)
                    }
                }
            }

        }catch (e) {
            
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
            res.render(
                'usuario/profile',
                {
                    titulo: titulo,
                    controlador: controlador,
                    currentUser: session.currentUser,
                    currentProfile: parametrosRuta.username
                });
        }else {
            return res.redirect("/home/login")
        }
    }

    @Get('logout')
    logout(
        @Session() session,
        @Res() res,
        @Req() req
    ){
        session.currentUser = undefined;
        //session.destroy();
        return res.redirect('/home/login')

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