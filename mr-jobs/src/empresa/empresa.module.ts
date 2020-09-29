import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmpresaEntity} from "./empresa.entity";
import {EmpresaController} from "./empresa.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature(
            [EmpresaEntity],
            'default'
        )
    ],
    controllers: [
        EmpresaController
    ],
    providers: [

    ]
})

export class EmpresaModule{}