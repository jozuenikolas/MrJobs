import {Controller, Get, Res} from "@nestjs/common";

//http://localhost:3000/empleo
@Controller("empleo")
export class EmpleoController{

    //http://localhost:3000/empleo/buscar
    @Get("buscar")
    buscar(
        @Res() res,
    ){
        const controlador = "empleo";
        const titulo = "Buscar empleo"
        res.render(
            'empleo/buscar',
            {
                titulo: titulo,
                controlador: controlador
            });
    }



}