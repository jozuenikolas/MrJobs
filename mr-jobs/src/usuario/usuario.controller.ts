import {Body, Controller, Get, Param, Post, Query, Req, Res, Session} from "@nestjs/common";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {TrabajoCreateDto} from "../trabajo/dto/trabajo.create-dto";

//http://localhost:3000/home
@Controller("home")
export class UsuarioController{


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
        usuarioNuevo.nombreUsuario = parametrosCuerpo.nombreUsuario;
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
        const nombreUsuario = parametrosCuerpo.nombreUsuario;
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
                })
            }else{
                console.log("exito");
                console.log(trabajoNuevo)
                console.log(nombreUsuario)
                console.log(parametrosCuerpo)
                session.currentUser = nombreUsuario;
                console.log(session)
                return res.redirect(`/home/profile/${nombreUsuario}`)
            }

        }catch (e) {
            
        }
    }

    //http://localhost:3000/profile/:nombreUsuario
    @Get("/profile/:nombreUsuario")
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
                    currentProfile: parametrosRuta.nombreUsuario
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