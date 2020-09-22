import {Controller, Get, Query, Res} from "@nestjs/common";

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
        res.render(
            'usuario/inicio',
            {
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
        res.render(
            'usuario/login',
            {
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
        res.render(
            'usuario/signup',
            {
                controlador: controlador
            });
    }

}