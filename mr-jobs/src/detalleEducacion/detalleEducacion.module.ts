import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DetalleEducacionEntity} from "./detalleEducacion.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [DetalleEducacionEntity],
            'default'
        )
    ],
    controllers: [

    ],
    providers: [

    ]
})

export class DetalleEducacionModule{}