import {Controller, Get, Param, Res, Session} from "@nestjs/common";
import {AplicacionService} from "./aplicacion.service";


//http://localhost:3000/aplicacion
@Controller("aplicacion")
export class AplicacionController {

    constructor(
        private readonly _aplicacionService: AplicacionService,
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
            res.render(
                'aplicacion/aplicar',
                {
                    titulo: titulo,
                    controlador: controlador,
                    currentUser: session.currentUser,
                    idEmpleo: parametrosRuta.idEmpleo
                });
        } else {
            return res.redirect("/home/login")

        }

    }

}