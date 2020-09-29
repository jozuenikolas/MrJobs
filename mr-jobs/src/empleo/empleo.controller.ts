import {Controller, Get, Res, Session} from "@nestjs/common";

//http://localhost:3000/empleo
@Controller("empleo")
export class EmpleoController{

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
                });
        }else{
            return res.redirect("/home/login")
        }
    }



}