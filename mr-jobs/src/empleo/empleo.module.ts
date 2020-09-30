import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmpleoEntity} from "./empleo.entity";
import {EmpleoController} from "./empleo.controller";
import {EmpresaModule} from "../empresa/empresa.module";
import {EmpleoService} from "./empleo.service";
import {UsuarioModule} from "../usuario/usuario.module";

@Module({
    imports: [
        UsuarioModule,
        EmpresaModule,
        TypeOrmModule.forFeature(
            [EmpleoEntity],
            'default'
        )
    ],
    controllers: [
        EmpleoController
    ],
    providers: [
        EmpleoService
    ],
    exports: [
        EmpleoService
    ]

})

export class EmpleoModule{}