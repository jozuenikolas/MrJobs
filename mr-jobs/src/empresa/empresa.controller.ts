import {Controller, Get, Res, Session} from "@nestjs/common";

@Controller("empresa")
export class EmpresaController {


    //http://localhost:3000/empresa/registrar
    @Get("registrar")
    buscar(
        @Res() res,
        @Session() session,
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
                });
        }else{
            return res.redirect("/home/login")
        }
    }

}