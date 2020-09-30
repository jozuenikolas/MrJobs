import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AplicacionEntity} from "./aplicacion.entity";
import {AplicacionController} from "./aplicacion.controller";
import {AplicacionService} from "./aplicacion.service";


@Module({
    imports: [
        TypeOrmModule.forFeature(
            [AplicacionEntity],
            'default'
        )
    ],
    controllers: [
        AplicacionController
    ],
    providers: [
        AplicacionService
    ]
})

export class AplicacionModule{}