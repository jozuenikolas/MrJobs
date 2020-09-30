import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {TrabajoModule} from "../trabajo/trabajo.module";
import {DetalleTrabajoModule} from "../detalleTrabajo/detalleTrabajo.module";

@Module({
    imports: [
        DetalleTrabajoModule,
        TrabajoModule,
        TypeOrmModule.forFeature(
            [UsuarioEntity],
            'default'
        )
    ],
    controllers: [
        UsuarioController,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        UsuarioService,
    ]
})

export class UsuarioModule{}