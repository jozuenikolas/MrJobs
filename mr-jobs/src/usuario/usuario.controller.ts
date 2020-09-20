import {Controller, Get} from "@nestjs/common";

@Controller("usuario")

export class UsuarioController{


    //http://localhost:3001/usuario/prueba
    @Get("prueba")
    prueba(){
        return "Retorno de Prueba"
    }


}