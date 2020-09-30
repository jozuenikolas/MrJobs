import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmpresaEntity} from "./empresa.entity";
import {EmpresaController} from "./empresa.controller";
import {EmpresaService} from "./empresa.service";
import {UsuarioModule} from "../usuario/usuario.module";


@Module({
    imports: [
        UsuarioModule,
        TypeOrmModule.forFeature(
            [EmpresaEntity],
            'default'
        )
    ],
    controllers: [
        EmpresaController
    ],
    providers: [
        EmpresaService
    ],
    exports: [
        EmpresaService
    ]
})

export class EmpresaModule{}