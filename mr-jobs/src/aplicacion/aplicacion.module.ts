import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AplicacionEntity} from "./aplicacion.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature(
            [AplicacionEntity],
            'default'
        )
    ],
    controllers: [

    ],
    providers: [

    ]
})

export class AplicacionModule{}